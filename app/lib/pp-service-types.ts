/**
 * pp-service-types.ts
 *
 * Type definitions and mock data for the D1 PP Service Dashboard (Nunga, Derby).
 *
 * The 3-tier participation model:
 *   1. 100% completion — families who attended every session
 *   2. Threshold completion — families who met the minimum attendance threshold
 *   3. Below threshold — families below the minimum attendance threshold
 *
 * The Situational Analysis (SA) panel provides population context:
 *   - 0–8 year-old population count and trend
 *   - Developmental vulnerability (AEDC DV1) count and trend
 */

// ── Participation tier data ──────────────────────────────────────────────────

export interface ParticipationTier {
    /** Human-readable label for the tier. */
    label: string;
    /** Number of families in this tier. */
    count: number;
    /** Percentage of total families in this tier (0–100, 1 decimal). */
    percentage: number;
}

export interface ParticipationTierData {
    /** Reporting period label (e.g. "Q3 2025"). */
    reportingPeriod: string;
    /** Program name (e.g. "Circle of Security"). */
    programName: string;
    /** Location name (e.g. "Nunga, Derby"). */
    location: string;
    /** Total enrolled families for the period. */
    totalFamilies: number;
    /** The three tiers, ordered: 100% completion, threshold, below threshold. */
    tiers: [ParticipationTier, ParticipationTier, ParticipationTier];
    /** Historical data for trend display, keyed by period label. */
    trend: Array<{
        period: string;
        tiers: [number, number, number]; // counts for each tier
    }>;
}

// ── Priority population filter ───────────────────────────────────────────────

export interface PriorityPopulation {
    label: string;
    value: string;
}

export const PRIORITY_POPULATIONS: PriorityPopulation[] = [
    { label: 'All enrolled families', value: 'all' },
    { label: 'Aboriginal & Torres Strait Islander', value: 'atsi' },
    { label: 'CALD families', value: 'cald' },
    { label: 'Single-parent families', value: 'single-parent' },
    { label: 'Young parents (<25)', value: 'young-parents' },
    { label: 'Families with disability', value: 'disability' },
];

// ── Situational analysis ─────────────────────────────────────────────────────

export interface TrendPoint {
    period: string;
    value: number;
}

export interface SituationalAnalysisData {
    /** Population of 0–8 year olds in the service area. */
    population0to8: {
        count: number;
        trend: TrendPoint[];
        changeLabel: string; // e.g. "+2.3% vs prior year"
    };
    /** Developmental vulnerability (AEDC DV1) in the service area. */
    aedcDV1: {
        count: number;
        percentage: number;
        trend: TrendPoint[];
        changeLabel: string; // e.g. "-1.2 pts vs prior period"
    };
}

// ── Dashboard state ──────────────────────────────────────────────────────────

export type DashboardState = 'loading' | 'empty' | 'error' | 'populated';

// ── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_PARTICIPATION_DATA: ParticipationTierData = {
    reportingPeriod: 'Q3 2025',
    programName: 'Circle of Security',
    location: 'Nunga, Derby',
    totalFamilies: 48,
    tiers: [
        { label: '100% completion', count: 14, percentage: 29.2 },
        { label: 'Threshold completion', count: 21, percentage: 43.8 },
        { label: 'Below threshold', count: 13, percentage: 27.1 },
    ],
    trend: [
        { period: 'Q1 2025', tiers: [10, 18, 16] },
        { period: 'Q2 2025', tiers: [12, 20, 14] },
        { period: 'Q3 2025', tiers: [14, 21, 13] },
    ],
};

export const MOCK_PARTICIPATION_DATA_ATSI: ParticipationTierData = {
    reportingPeriod: 'Q3 2025',
    programName: 'Circle of Security',
    location: 'Nunga, Derby',
    totalFamilies: 31,
    tiers: [
        { label: '100% completion', count: 7, percentage: 22.6 },
        { label: 'Threshold completion', count: 13, percentage: 41.9 },
        { label: 'Below threshold', count: 11, percentage: 35.5 },
    ],
    trend: [
        { period: 'Q1 2025', tiers: [5, 11, 14] },
        { period: 'Q2 2025', tiers: [6, 12, 12] },
        { period: 'Q3 2025', tiers: [7, 13, 11] },
    ],
};

export const MOCK_SA_DATA: SituationalAnalysisData = {
    population0to8: {
        count: 1247,
        trend: [
            { period: '2021', value: 1180 },
            { period: '2022', value: 1205 },
            { period: '2023', value: 1220 },
            { period: '2024', value: 1234 },
            { period: '2025', value: 1247 },
        ],
        changeLabel: '+1.1% vs prior year',
    },
    aedcDV1: {
        count: 387,
        percentage: 31.0,
        trend: [
            { period: '2018', value: 36.2 },
            { period: '2021', value: 33.8 },
            { period: '2024', value: 31.0 },
        ],
        changeLabel: '-2.8 pts vs 2021',
    },
};

/** Map of priority population value → participation data for filtering. */
export const MOCK_PARTICIPATION_BY_POPULATION: Record<string, ParticipationTierData> = {
    all: MOCK_PARTICIPATION_DATA,
    atsi: MOCK_PARTICIPATION_DATA_ATSI,
    cald: {
        ...MOCK_PARTICIPATION_DATA,
        totalFamilies: 8,
        tiers: [
            { label: '100% completion', count: 3, percentage: 37.5 },
            { label: 'Threshold completion', count: 3, percentage: 37.5 },
            { label: 'Below threshold', count: 2, percentage: 25.0 },
        ],
        trend: [
            { period: 'Q1 2025', tiers: [2, 3, 3] },
            { period: 'Q2 2025', tiers: [3, 3, 2] },
            { period: 'Q3 2025', tiers: [3, 3, 2] },
        ],
    },
    'single-parent': {
        ...MOCK_PARTICIPATION_DATA,
        totalFamilies: 15,
        tiers: [
            { label: '100% completion', count: 4, percentage: 26.7 },
            { label: 'Threshold completion', count: 6, percentage: 40.0 },
            { label: 'Below threshold', count: 5, percentage: 33.3 },
        ],
        trend: [
            { period: 'Q1 2025', tiers: [3, 5, 7] },
            { period: 'Q2 2025', tiers: [3, 6, 6] },
            { period: 'Q3 2025', tiers: [4, 6, 5] },
        ],
    },
    'young-parents': {
        ...MOCK_PARTICIPATION_DATA,
        totalFamilies: 11,
        tiers: [
            { label: '100% completion', count: 2, percentage: 18.2 },
            { label: 'Threshold completion', count: 4, percentage: 36.4 },
            { label: 'Below threshold', count: 5, percentage: 45.5 },
        ],
        trend: [
            { period: 'Q1 2025', tiers: [1, 3, 6] },
            { period: 'Q2 2025', tiers: [2, 3, 6] },
            { period: 'Q3 2025', tiers: [2, 4, 5] },
        ],
    },
    disability: {
        ...MOCK_PARTICIPATION_DATA,
        totalFamilies: 6,
        tiers: [
            { label: '100% completion', count: 1, percentage: 16.7 },
            { label: 'Threshold completion', count: 3, percentage: 50.0 },
            { label: 'Below threshold', count: 2, percentage: 33.3 },
        ],
        trend: [
            { period: 'Q1 2025', tiers: [1, 2, 3] },
            { period: 'Q2 2025', tiers: [1, 3, 2] },
            { period: 'Q3 2025', tiers: [1, 3, 2] },
        ],
    },
};
