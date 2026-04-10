// World Bank API Types

export interface WBIndicator {
  id: string
  name: string
  source: {
    id: string
    value: string
  }
  sourceNote: string
  sourceOrganization: string
  topics: Array<{ id: string; value: string }>
}

export interface WBCountry {
  id: string
  iso2Code: string
  name: string
  region: {
    id: string
    iso2code: string
    value: string
  }
  incomeLevel: {
    id: string
    iso2code: string
    value: string
  }
  capitalCity: string
  longitude: string
  latitude: string
}

export interface WBDataPoint {
  indicator: {
    id: string
    value: string
  }
  country: {
    id: string
    value: string
  }
  countryiso3code: string
  date: string
  value: number | null
  unit: string
  obs_status: string
  decimal: number
}

export interface WBPagination {
  page: number
  pages: number
  per_page: number
  total: number
  sourceid: string
  sourcename: string
  lastupdated: string
}

export interface WBResponse<T> {
  pagination: WBPagination
  data: T[]
}

// Finsyt domain types
export interface EconomicIndicator {
  id: string
  name: string
  shortName: string
  category: 'gdp' | 'inflation' | 'employment' | 'trade' | 'finance' | 'demographics'
  unit: string
  frequency: 'annual' | 'quarterly' | 'monthly'
}

export interface CountryData {
  countryCode: string
  countryName: string
  indicatorId: string
  indicatorName: string
  values: Array<{
    year: number
    value: number | null
  }>
  latestValue: number | null
  latestYear: number | null
  change: number | null
  changePercent: number | null
}

export interface MacroSignal {
  id: string
  type: 'positive' | 'negative' | 'neutral'
  indicator: string
  country: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  timestamp: Date
  data: {
    current: number
    previous: number
    change: number
    changePercent: number
  }
}

// Key indicators we track
export const KEY_INDICATORS: EconomicIndicator[] = [
  { id: 'NY.GDP.MKTP.CD', name: 'GDP (current US$)', shortName: 'GDP', category: 'gdp', unit: 'USD', frequency: 'annual' },
  { id: 'NY.GDP.MKTP.KD.ZG', name: 'GDP growth (annual %)', shortName: 'GDP Growth', category: 'gdp', unit: '%', frequency: 'annual' },
  { id: 'NY.GDP.PCAP.CD', name: 'GDP per capita (current US$)', shortName: 'GDP/Capita', category: 'gdp', unit: 'USD', frequency: 'annual' },
  { id: 'FP.CPI.TOTL.ZG', name: 'Inflation, consumer prices (annual %)', shortName: 'CPI', category: 'inflation', unit: '%', frequency: 'annual' },
  { id: 'SL.UEM.TOTL.ZS', name: 'Unemployment, total (% of labor force)', shortName: 'Unemployment', category: 'employment', unit: '%', frequency: 'annual' },
  { id: 'BX.KLT.DINV.WD.GD.ZS', name: 'Foreign direct investment, net inflows (% of GDP)', shortName: 'FDI', category: 'finance', unit: '%', frequency: 'annual' },
  { id: 'NE.EXP.GNFS.ZS', name: 'Exports of goods and services (% of GDP)', shortName: 'Exports', category: 'trade', unit: '%', frequency: 'annual' },
  { id: 'NE.IMP.GNFS.ZS', name: 'Imports of goods and services (% of GDP)', shortName: 'Imports', category: 'trade', unit: '%', frequency: 'annual' },
  { id: 'GC.DOD.TOTL.GD.ZS', name: 'Central government debt, total (% of GDP)', shortName: 'Govt Debt', category: 'finance', unit: '%', frequency: 'annual' },
  { id: 'SP.POP.TOTL', name: 'Population, total', shortName: 'Population', category: 'demographics', unit: 'people', frequency: 'annual' },
]

// Key countries we track
export const KEY_COUNTRIES = [
  { code: 'USA', name: 'United States' },
  { code: 'CHN', name: 'China' },
  { code: 'JPN', name: 'Japan' },
  { code: 'DEU', name: 'Germany' },
  { code: 'GBR', name: 'United Kingdom' },
  { code: 'FRA', name: 'France' },
  { code: 'IND', name: 'India' },
  { code: 'BRA', name: 'Brazil' },
  { code: 'CAN', name: 'Canada' },
  { code: 'AUS', name: 'Australia' },
]
