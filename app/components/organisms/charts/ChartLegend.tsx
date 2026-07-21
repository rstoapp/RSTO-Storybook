import * as React from 'react';
import { CHART_FONT_FAMILY, P } from './chart-theme';
import { CHART_DENSITY, type ChartDensity } from './default-chart-options';

export interface ChartLegendItem {
    label: string;
    color: string;
}

export interface ChartLegendProps {
    items: ChartLegendItem[];
    density?: ChartDensity;
}

const SWATCH_SIZE = 11;
const SWATCH_RADIUS = 3;

export default function ChartLegend({ items, density = 'standard' }: ChartLegendProps) {
    const d = CHART_DENSITY[density];

    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: `6px ${d.legendPad}px`,
                fontFamily: CHART_FONT_FAMILY,
                fontSize: d.legendFont,
                color: P.shadow,
                lineHeight: 1,
            }}
        >
            {items.map((item) => (
                <div
                    key={item.label}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                    }}
                >
                    <span
                        aria-hidden="true"
                        style={{
                            display: 'inline-block',
                            width: SWATCH_SIZE,
                            height: SWATCH_SIZE,
                            borderRadius: SWATCH_RADIUS,
                            backgroundColor: item.color,
                            flexShrink: 0,
                        }}
                    />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
}
