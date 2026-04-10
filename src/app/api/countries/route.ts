import { NextRequest, NextResponse } from 'next/server'
import { getCountries, getCountryIndicators, transformToCountryData } from '@/lib/worldbank'
import { KEY_INDICATORS, KEY_COUNTRIES } from '@/types/worldbank'

export const dynamic = 'force-dynamic'

/**
 * GET /api/countries
 *
 * Query params:
 * - code: Get specific country data with indicators
 * - all: Fetch full list from World Bank (warning: large)
 * - list: Return list of key countries
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const code = searchParams.get('code')
  const all = searchParams.get('all')
  const list = searchParams.get('list')

  try {
    // Return key countries
    if (list === 'true') {
      return NextResponse.json({
        success: true,
        data: KEY_COUNTRIES
      })
    }

    // Fetch all countries from World Bank
    if (all === 'true') {
      const countries = await getCountries()
      return NextResponse.json({
        success: true,
        data: countries
      })
    }

    // Get specific country with key indicators
    if (code) {
      const indicatorIds = KEY_INDICATORS.slice(0, 5).map(i => i.id)
      const indicatorData = await getCountryIndicators(code, indicatorIds)

      const country = KEY_COUNTRIES.find(c => c.code === code)
      const countryName = country?.name || code

      const indicators = Array.from(indicatorData.entries()).map(([id, data]) => {
        const indicator = KEY_INDICATORS.find(i => i.id === id)
        return transformToCountryData(
          code,
          countryName,
          id,
          indicator?.name || id,
          data
        )
      })

      return NextResponse.json({
        success: true,
        country: {
          code,
          name: countryName
        },
        indicators
      })
    }

    // Default: return key countries
    return NextResponse.json({
      success: true,
      data: KEY_COUNTRIES
    })

  } catch (error) {
    console.error('Countries API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch country data' },
      { status: 500 }
    )
  }
}
