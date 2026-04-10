import { NextRequest, NextResponse } from 'next/server'
import {
  getIndicatorData,
  getIndicatorMetadata,
  searchIndicators,
  transformToCountryData
} from '@/lib/worldbank'
import { KEY_INDICATORS, KEY_COUNTRIES } from '@/types/worldbank'

export const dynamic = 'force-dynamic'

/**
 * GET /api/indicators
 *
 * Query params:
 * - search: Search indicators by name
 * - id: Get specific indicator
 * - country: Country code (required with id)
 * - list: Return list of key indicators
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get('search')
  const indicatorId = searchParams.get('id')
  const countryCode = searchParams.get('country')
  const list = searchParams.get('list')

  try {
    // Return list of key indicators
    if (list === 'true') {
      return NextResponse.json({
        success: true,
        data: KEY_INDICATORS
      })
    }

    // Search indicators
    if (search) {
      const results = await searchIndicators(search)
      return NextResponse.json({
        success: true,
        data: results
      })
    }

    // Get specific indicator data
    if (indicatorId && countryCode) {
      const [rawData, metadata] = await Promise.all([
        getIndicatorData(countryCode, indicatorId),
        getIndicatorMetadata(indicatorId)
      ])

      const country = KEY_COUNTRIES.find(c => c.code === countryCode)
      const countryData = transformToCountryData(
        countryCode,
        country?.name || countryCode,
        indicatorId,
        metadata?.name || indicatorId,
        rawData
      )

      return NextResponse.json({
        success: true,
        data: countryData,
        metadata
      })
    }

    // Get indicator metadata only
    if (indicatorId) {
      const metadata = await getIndicatorMetadata(indicatorId)
      return NextResponse.json({
        success: true,
        data: metadata
      })
    }

    // Default: return key indicators with descriptions
    return NextResponse.json({
      success: true,
      data: KEY_INDICATORS,
      countries: KEY_COUNTRIES
    })

  } catch (error) {
    console.error('Indicator API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch indicator data' },
      { status: 500 }
    )
  }
}
