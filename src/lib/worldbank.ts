/**
 * World Bank Data API Service
 *
 * Fetches economic indicators from World Bank Indicators API v2
 * Base URL: https://api.worldbank.org/v2
 *
 * No authentication required for public data.
 */

import {
  WBDataPoint,
  WBCountry,
  WBIndicator,
  CountryData,
  MacroSignal,
  KEY_INDICATORS,
  KEY_COUNTRIES
} from '@/types/worldbank'

const BASE_URL = 'https://api.worldbank.org/v2'

// Simple in-memory cache with TTL
const cache = new Map<string, { data: unknown; expires: number }>()
const CACHE_TTL = 1000 * 60 * 60 // 1 hour

function getCached<T>(key: string): T | null {
  const entry = cache.get(key)
  if (entry && entry.expires > Date.now()) {
    return entry.data as T
  }
  cache.delete(key)
  return null
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, expires: Date.now() + CACHE_TTL })
}

/**
 * Fetch indicator data for a country
 */
export async function getIndicatorData(
  countryCode: string,
  indicatorId: string,
  startYear?: number,
  endYear?: number
): Promise<WBDataPoint[]> {
  const cacheKey = `indicator:${countryCode}:${indicatorId}:${startYear}:${endYear}`
  const cached = getCached<WBDataPoint[]>(cacheKey)
  if (cached) return cached

  const dateRange = startYear && endYear ? `&date=${startYear}:${endYear}` : ''
  const url = `${BASE_URL}/country/${countryCode}/indicator/${indicatorId}?format=json&per_page=100${dateRange}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`World Bank API error: ${response.status}`)
  }

  const json = await response.json()

  // API returns [pagination, data] array
  if (!Array.isArray(json) || json.length < 2) {
    return []
  }

  const data = json[1] as WBDataPoint[] | null
  const result = data || []

  setCache(cacheKey, result)
  return result
}

/**
 * Fetch multiple indicators for a country
 */
export async function getCountryIndicators(
  countryCode: string,
  indicatorIds: string[]
): Promise<Map<string, WBDataPoint[]>> {
  const results = new Map<string, WBDataPoint[]>()

  // Fetch all indicators in parallel
  const promises = indicatorIds.map(async (id) => {
    const data = await getIndicatorData(countryCode, id)
    return { id, data }
  })

  const resolved = await Promise.all(promises)
  resolved.forEach(({ id, data }) => results.set(id, data))

  return results
}

/**
 * Fetch a single indicator across multiple countries
 */
export async function getIndicatorAcrossCountries(
  indicatorId: string,
  countryCodes: string[]
): Promise<Map<string, WBDataPoint[]>> {
  const results = new Map<string, WBDataPoint[]>()

  const promises = countryCodes.map(async (code) => {
    const data = await getIndicatorData(code, indicatorId)
    return { code, data }
  })

  const resolved = await Promise.all(promises)
  resolved.forEach(({ code, data }) => results.set(code, data))

  return results
}

/**
 * Get list of all countries
 */
export async function getCountries(): Promise<WBCountry[]> {
  const cacheKey = 'countries'
  const cached = getCached<WBCountry[]>(cacheKey)
  if (cached) return cached

  const url = `${BASE_URL}/country?format=json&per_page=300`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`World Bank API error: ${response.status}`)
  }

  const json = await response.json()
  const data = json[1] as WBCountry[] | null
  const result = data || []

  setCache(cacheKey, result)
  return result
}

/**
 * Get indicator metadata
 */
export async function getIndicatorMetadata(indicatorId: string): Promise<WBIndicator | null> {
  const cacheKey = `indicator-meta:${indicatorId}`
  const cached = getCached<WBIndicator>(cacheKey)
  if (cached) return cached

  const url = `${BASE_URL}/indicator/${indicatorId}?format=json`
  const response = await fetch(url)

  if (!response.ok) return null

  const json = await response.json()
  const data = json[1] as WBIndicator[] | null
  const result = data?.[0] || null

  if (result) setCache(cacheKey, result)
  return result
}

/**
 * Transform raw data to CountryData format with calculated changes
 */
export function transformToCountryData(
  countryCode: string,
  countryName: string,
  indicatorId: string,
  indicatorName: string,
  rawData: WBDataPoint[]
): CountryData {
  // Sort by year descending
  const sorted = [...rawData]
    .filter(d => d.value !== null)
    .sort((a, b) => parseInt(b.date) - parseInt(a.date))

  const values = sorted.map(d => ({
    year: parseInt(d.date),
    value: d.value
  }))

  const latestValue = values[0]?.value ?? null
  const latestYear = values[0]?.year ?? null
  const previousValue = values[1]?.value ?? null

  let change: number | null = null
  let changePercent: number | null = null

  if (latestValue !== null && previousValue !== null) {
    change = latestValue - previousValue
    changePercent = previousValue !== 0 ? (change / previousValue) * 100 : null
  }

  return {
    countryCode,
    countryName,
    indicatorId,
    indicatorName,
    values,
    latestValue,
    latestYear,
    change,
    changePercent
  }
}

/**
 * Generate macro signals from indicator data
 */
export function generateSignals(countryData: CountryData[]): MacroSignal[] {
  const signals: MacroSignal[] = []

  for (const data of countryData) {
    if (data.change === null || data.changePercent === null) continue

    const absChange = Math.abs(data.changePercent)

    // Only generate signals for significant changes
    if (absChange < 1) continue

    const isPositive = data.change > 0
    const indicator = KEY_INDICATORS.find(i => i.id === data.indicatorId)

    // Determine if change is good or bad based on indicator type
    let type: 'positive' | 'negative' | 'neutral' = 'neutral'
    if (indicator) {
      if (indicator.category === 'gdp' || indicator.category === 'trade') {
        type = isPositive ? 'positive' : 'negative'
      } else if (indicator.category === 'inflation' || indicator.category === 'employment') {
        // For unemployment and inflation, increases are generally negative
        type = isPositive ? 'negative' : 'positive'
      }
    }

    const impact: 'high' | 'medium' | 'low' =
      absChange > 10 ? 'high' :
      absChange > 5 ? 'medium' : 'low'

    const direction = isPositive ? 'rose' : 'fell'

    signals.push({
      id: `${data.countryCode}-${data.indicatorId}-${data.latestYear}`,
      type,
      indicator: indicator?.shortName || data.indicatorName,
      country: data.countryName,
      title: `${data.countryName} ${indicator?.shortName || 'indicator'} ${direction} ${absChange.toFixed(1)}%`,
      description: `${data.indicatorName} changed from ${data.latestValue !== null && data.change !== null ? (data.latestValue - data.change).toFixed(2) : 'N/A'} to ${data.latestValue?.toFixed(2) || 'N/A'}`,
      impact,
      timestamp: new Date(),
      data: {
        current: data.latestValue || 0,
        previous: data.latestValue !== null && data.change !== null ? data.latestValue - data.change : 0,
        change: data.change,
        changePercent: data.changePercent
      }
    })
  }

  // Sort by impact and recency
  return signals.sort((a, b) => {
    const impactOrder = { high: 0, medium: 1, low: 2 }
    return impactOrder[a.impact] - impactOrder[b.impact]
  })
}

/**
 * Fetch dashboard data - all key indicators for key countries
 */
export async function getDashboardData(): Promise<{
  countryData: CountryData[]
  signals: MacroSignal[]
}> {
  const cacheKey = 'dashboard-data'
  const cached = getCached<{ countryData: CountryData[]; signals: MacroSignal[] }>(cacheKey)
  if (cached) return cached

  const allCountryData: CountryData[] = []

  // Fetch key indicators for key countries
  const promises: Promise<void>[] = []

  for (const country of KEY_COUNTRIES) {
    for (const indicator of KEY_INDICATORS.slice(0, 5)) { // Top 5 indicators
      promises.push(
        getIndicatorData(country.code, indicator.id)
          .then(data => {
            const countryData = transformToCountryData(
              country.code,
              country.name,
              indicator.id,
              indicator.name,
              data
            )
            allCountryData.push(countryData)
          })
          .catch(() => {
            // Silently skip failed requests
          })
      )
    }
  }

  await Promise.all(promises)

  const signals = generateSignals(allCountryData)

  const result = { countryData: allCountryData, signals }
  setCache(cacheKey, result)

  return result
}

/**
 * Search indicators by keyword
 */
export async function searchIndicators(query: string): Promise<WBIndicator[]> {
  const cacheKey = `search:${query}`
  const cached = getCached<WBIndicator[]>(cacheKey)
  if (cached) return cached

  const url = `${BASE_URL}/indicator?format=json&per_page=50`
  const response = await fetch(url)

  if (!response.ok) return []

  const json = await response.json()
  const data = json[1] as WBIndicator[] | null

  if (!data) return []

  // Filter by query (API doesn't support search, so we filter client-side)
  const results = data.filter(ind =>
    ind.name.toLowerCase().includes(query.toLowerCase()) ||
    ind.id.toLowerCase().includes(query.toLowerCase())
  )

  setCache(cacheKey, results)
  return results
}
