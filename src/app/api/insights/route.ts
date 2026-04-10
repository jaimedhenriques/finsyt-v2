import { NextRequest, NextResponse } from 'next/server'
import { getDashboardData } from '@/lib/worldbank'
import {
  generateInsightsFromSignals,
  generateMarketSummary,
  generateCountryAnalysis
} from '@/lib/insights'

export const dynamic = 'force-dynamic'

// Simple rate limiting
let lastInsightGeneration = 0
const RATE_LIMIT_MS = 10000 // 10 seconds between generations

/**
 * GET /api/insights
 *
 * Query params:
 * - country: Generate country-specific analysis
 * - refresh: Force regeneration (rate limited)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const countryCode = searchParams.get('country')
  const refresh = searchParams.get('refresh') === 'true'

  // Check API key
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      success: false,
      error: 'AI insights require ANTHROPIC_API_KEY environment variable',
      fallback: true,
      insights: [],
      marketSummary: {
        headline: 'Configure AI for Insights',
        summary: 'Add ANTHROPIC_API_KEY to enable AI-powered analysis.',
        outlook: 'mixed'
      }
    })
  }

  try {
    // Rate limiting
    const now = Date.now()
    if (refresh && now - lastInsightGeneration < RATE_LIMIT_MS) {
      return NextResponse.json({
        success: false,
        error: `Rate limited. Wait ${Math.ceil((RATE_LIMIT_MS - (now - lastInsightGeneration)) / 1000)}s`,
        retryAfter: Math.ceil((RATE_LIMIT_MS - (now - lastInsightGeneration)) / 1000)
      }, { status: 429 })
    }

    // Fetch underlying data
    const { countryData, signals } = await getDashboardData()

    // Country-specific analysis
    if (countryCode) {
      const countryIndicators = countryData.filter(d => d.countryCode === countryCode)
      if (countryIndicators.length === 0) {
        return NextResponse.json({
          success: false,
          error: `No data found for country: ${countryCode}`
        }, { status: 404 })
      }

      const analysis = await generateCountryAnalysis(countryIndicators)
      return NextResponse.json({
        success: true,
        country: countryCode,
        analysis
      })
    }

    // Generate full insights
    lastInsightGeneration = now

    const [insights, marketSummary] = await Promise.all([
      generateInsightsFromSignals(signals),
      generateMarketSummary(
        signals,
        countryData.length,
        new Set(countryData.map(d => d.indicatorId)).size
      )
    ])

    return NextResponse.json({
      success: true,
      insights,
      marketSummary,
      generatedAt: new Date().toISOString(),
      dataPoints: {
        signals: signals.length,
        countries: new Set(countryData.map(d => d.countryCode)).size,
        indicators: new Set(countryData.map(d => d.indicatorId)).size
      }
    })

  } catch (error) {
    console.error('Insights API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}
