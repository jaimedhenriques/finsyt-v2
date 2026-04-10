'use client'

import { useState, useEffect } from 'react'
import { CountryData, MacroSignal } from '@/types/worldbank'

interface DashboardData {
  summary: {
    totalIndicators: number
    withChanges: number
    positiveChanges: number
    negativeChanges: number
    signalCount: number
    highImpactSignals: number
    lastUpdated: string
  }
  signals: MacroSignal[]
  countries: Array<{
    code: string
    name: string
    indicators: CountryData[]
  }>
}

interface UseDashboardResult {
  data: DashboardData | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useDashboard(): UseDashboardResult {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/dashboard')
      const json = await response.json()

      if (json.success) {
        setData(json)
      } else {
        setError(json.error || 'Failed to fetch data')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return { data, loading, error, refetch: fetchData }
}

interface UseCountryResult {
  data: {
    code: string
    name: string
    indicators: CountryData[]
  } | null
  loading: boolean
  error: string | null
}

export function useCountry(code: string): UseCountryResult {
  const [data, setData] = useState<UseCountryResult['data']>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/countries?code=${code}`)
        const json = await response.json()

        if (json.success) {
          setData({
            code: json.country.code,
            name: json.country.name,
            indicators: json.indicators
          })
        } else {
          setError(json.error || 'Failed to fetch data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error')
      } finally {
        setLoading(false)
      }
    }

    if (code) fetchData()
  }, [code])

  return { data, loading, error }
}

interface UseIndicatorResult {
  data: CountryData | null
  loading: boolean
  error: string | null
}

export function useIndicator(indicatorId: string, countryCode: string): UseIndicatorResult {
  const [data, setData] = useState<CountryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`/api/indicators?id=${indicatorId}&country=${countryCode}`)
        const json = await response.json()

        if (json.success) {
          setData(json.data)
        } else {
          setError(json.error || 'Failed to fetch data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error')
      } finally {
        setLoading(false)
      }
    }

    if (indicatorId && countryCode) fetchData()
  }, [indicatorId, countryCode])

  return { data, loading, error }
}
