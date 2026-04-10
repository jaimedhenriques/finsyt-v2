import { NextResponse } from 'next/server'
import { getDashboardData } from '@/lib/worldbank'

export const dynamic = 'force-dynamic'

/**
 * GET /api/dashboard
 *
 * Returns aggregated dashboard data:
 * - Country economic data for key countries
 * - Generated macro signals
 */
export async function GET() {
  try {
    const { countryData, signals } = await getDashboardData()

    // Group data by country
    const byCountry = new Map<string, typeof countryData>()
    for (const data of countryData) {
      const existing = byCountry.get(data.countryCode) || []
      existing.push(data)
      byCountry.set(data.countryCode, existing)
    }

    // Calculate summary stats
    const totalIndicators = countryData.length
    const withChanges = countryData.filter(d => d.change !== null).length
    const positiveChanges = countryData.filter(d => d.change !== null && d.change > 0).length
    const negativeChanges = withChanges - positiveChanges

    return NextResponse.json({
      success: true,
      summary: {
        totalIndicators,
        withChanges,
        positiveChanges,
        negativeChanges,
        signalCount: signals.length,
        highImpactSignals: signals.filter(s => s.impact === 'high').length,
        lastUpdated: new Date().toISOString()
      },
      signals: signals.slice(0, 20), // Top 20 signals
      countries: Array.from(byCountry.entries()).map(([code, indicators]) => ({
        code,
        name: indicators[0]?.countryName || code,
        indicators
      }))
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
