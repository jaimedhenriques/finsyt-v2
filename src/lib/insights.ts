/**
 * AI Insights Service
 *
 * Uses Claude API to generate financial insights from economic data.
 */

import Anthropic from '@anthropic-ai/sdk'
import { CountryData, MacroSignal } from '@/types/worldbank'

// Initialize client - will use ANTHROPIC_API_KEY env variable
const anthropic = new Anthropic()

export interface AIInsight {
  id: string
  title: string
  summary: string
  analysis: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  confidence: 'high' | 'medium' | 'low'
  indicators: string[]
  countries: string[]
  actionItems: string[]
  timestamp: Date
}

/**
 * Generate AI insights from macro signals
 */
export async function generateInsightsFromSignals(
  signals: MacroSignal[]
): Promise<AIInsight[]> {
  if (signals.length === 0) return []

  const signalSummary = signals.slice(0, 10).map(s => ({
    country: s.country,
    indicator: s.indicator,
    title: s.title,
    change: `${s.data.changePercent >= 0 ? '+' : ''}${s.data.changePercent.toFixed(1)}%`,
    impact: s.impact,
    type: s.type
  }))

  const prompt = `You are a senior financial analyst at a macro hedge fund. Analyze these economic signals from World Bank data and generate 3 key insights for portfolio managers.

SIGNALS:
${JSON.stringify(signalSummary, null, 2)}

For each insight, provide:
1. A concise title (max 10 words)
2. A one-sentence summary
3. A brief analysis paragraph (2-3 sentences)
4. Sentiment: bullish, bearish, or neutral
5. Confidence: high, medium, or low
6. Related countries
7. 1-2 actionable recommendations

Respond in JSON format:
{
  "insights": [
    {
      "title": "...",
      "summary": "...",
      "analysis": "...",
      "sentiment": "bullish|bearish|neutral",
      "confidence": "high|medium|low",
      "countries": ["..."],
      "actionItems": ["..."]
    }
  ]
}

Focus on actionable, data-driven insights. Be specific about causation and correlation.`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        { role: 'user', content: prompt }
      ]
    })

    const content = response.content[0]
    if (content.type !== 'text') return []

    // Parse JSON from response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return []

    const parsed = JSON.parse(jsonMatch[0])
    const insights: AIInsight[] = parsed.insights.map((ins: Omit<AIInsight, 'id' | 'timestamp' | 'indicators'>, i: number) => ({
      id: `insight-${Date.now()}-${i}`,
      title: ins.title,
      summary: ins.summary,
      analysis: ins.analysis,
      sentiment: ins.sentiment,
      confidence: ins.confidence,
      indicators: signals.slice(0, 5).map(s => s.indicator),
      countries: ins.countries,
      actionItems: ins.actionItems,
      timestamp: new Date()
    }))

    return insights
  } catch (error) {
    console.error('AI insights generation error:', error)
    return []
  }
}

/**
 * Generate country-specific analysis
 */
export async function generateCountryAnalysis(
  countryData: CountryData[]
): Promise<string> {
  if (countryData.length === 0) return ''

  const country = countryData[0].countryName
  const dataPoints = countryData.map(d => ({
    indicator: d.indicatorName,
    latestValue: d.latestValue,
    latestYear: d.latestYear,
    change: d.changePercent ? `${d.changePercent >= 0 ? '+' : ''}${d.changePercent.toFixed(1)}%` : 'N/A'
  }))

  const prompt = `You are an economist. Provide a brief (3-4 sentences) economic outlook for ${country} based on this World Bank data:

${JSON.stringify(dataPoints, null, 2)}

Focus on: growth trajectory, inflation concerns, trade dynamics. Be specific and data-driven.`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [
        { role: 'user', content: prompt }
      ]
    })

    const content = response.content[0]
    if (content.type !== 'text') return ''

    return content.text
  } catch (error) {
    console.error('Country analysis error:', error)
    return ''
  }
}

/**
 * Generate a market summary from multiple data sources
 */
export async function generateMarketSummary(
  signals: MacroSignal[],
  countryCount: number,
  indicatorCount: number
): Promise<{
  headline: string
  summary: string
  outlook: 'risk-on' | 'risk-off' | 'mixed'
}> {
  const positiveSignals = signals.filter(s => s.type === 'positive').length
  const negativeSignals = signals.filter(s => s.type === 'negative').length
  const highImpact = signals.filter(s => s.impact === 'high')

  const prompt = `You are a global macro strategist. Based on ${countryCount} countries and ${indicatorCount} economic indicators:

- Positive signals: ${positiveSignals}
- Negative signals: ${negativeSignals}
- High-impact developments: ${highImpact.map(s => s.title).join('; ')}

Provide:
1. A headline (max 8 words) summarizing current macro conditions
2. A one-sentence market summary
3. Overall outlook: risk-on, risk-off, or mixed

Respond in JSON:
{
  "headline": "...",
  "summary": "...",
  "outlook": "risk-on|risk-off|mixed"
}`

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      messages: [
        { role: 'user', content: prompt }
      ]
    })

    const content = response.content[0]
    if (content.type !== 'text') {
      return { headline: 'Markets Mixed', summary: 'Economic data shows mixed signals.', outlook: 'mixed' }
    }

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return { headline: 'Markets Mixed', summary: 'Economic data shows mixed signals.', outlook: 'mixed' }
    }

    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Market summary error:', error)
    return { headline: 'Markets Mixed', summary: 'Economic data shows mixed signals.', outlook: 'mixed' }
  }
}
