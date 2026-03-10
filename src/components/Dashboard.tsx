import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Ornament } from './Ornament';

type MonthDatum = {
  month: string;
  revenue: number;
  cases: number;
  margin: number;
  orders: number;
  accounts: number;
  fillRate: number;
};

type MetricKey = 'revenue' | 'cases' | 'margin';

const BASE_SERIES: MonthDatum[] = [
  { month: 'Jan', revenue: 128000, cases: 1460, margin: 0.32, orders: 214, accounts: 62, fillRate: 0.93 },
  { month: 'Feb', revenue: 134000, cases: 1520, margin: 0.33, orders: 226, accounts: 64, fillRate: 0.94 },
  { month: 'Mar', revenue: 158000, cases: 1710, margin: 0.35, orders: 248, accounts: 67, fillRate: 0.95 },
  { month: 'Apr', revenue: 149000, cases: 1630, margin: 0.34, orders: 232, accounts: 66, fillRate: 0.94 },
  { month: 'May', revenue: 162000, cases: 1780, margin: 0.36, orders: 255, accounts: 69, fillRate: 0.95 },
  { month: 'Jun', revenue: 174000, cases: 1900, margin: 0.36, orders: 266, accounts: 70, fillRate: 0.95 },
  { month: 'Jul', revenue: 168000, cases: 1820, margin: 0.35, orders: 259, accounts: 69, fillRate: 0.94 },
  { month: 'Aug', revenue: 176000, cases: 1940, margin: 0.35, orders: 271, accounts: 72, fillRate: 0.95 },
  { month: 'Sep', revenue: 189000, cases: 2080, margin: 0.37, orders: 284, accounts: 74, fillRate: 0.96 },
  { month: 'Oct', revenue: 204000, cases: 2240, margin: 0.38, orders: 301, accounts: 76, fillRate: 0.96 },
  { month: 'Nov', revenue: 221000, cases: 2440, margin: 0.39, orders: 322, accounts: 79, fillRate: 0.97 },
  { month: 'Dec', revenue: 238000, cases: 2600, margin: 0.39, orders: 340, accounts: 81, fillRate: 0.97 },
];

const TOP_WINES = [
  { name: 'Barolo DOCG', origin: 'Piedmont', revenue: 186000, cases: 220, growth: 12 },
  { name: 'Burgundy Pinot', origin: 'Cote de Nuits', revenue: 164000, cases: 190, growth: 8 },
  { name: 'Rioja Reserva', origin: 'Rioja Alta', revenue: 142000, cases: 260, growth: 6 },
  { name: 'Etna Rosso', origin: 'Sicily', revenue: 118000, cases: 210, growth: 10 },
  { name: 'Albarino', origin: 'Rias Baixas', revenue: 98000, cases: 240, growth: 4 },
];

const REGION_FACTORS: Record<string, number> = {
  National: 1,
  Northeast: 0.64,
  Midwest: 0.52,
  West: 0.58,
};

const CHANNEL_FACTORS: Record<string, number> = {
  All: 1,
  Retail: 0.56,
  'On-Premise': 0.29,
  Ecommerce: 0.15,
};

const CHANNEL_MARGIN_ADJUST: Record<string, number> = {
  All: 0,
  Retail: -0.02,
  'On-Premise': 0.03,
  Ecommerce: 0.05,
};

const CHANNEL_MIX_BY_REGION: Record<string, { name: string; value: number }[]> = {
  National: [
    { name: 'Retail', value: 56 },
    { name: 'On-Premise', value: 29 },
    { name: 'Ecommerce', value: 15 },
  ],
  Northeast: [
    { name: 'Retail', value: 52 },
    { name: 'On-Premise', value: 35 },
    { name: 'Ecommerce', value: 13 },
  ],
  Midwest: [
    { name: 'Retail', value: 60 },
    { name: 'On-Premise', value: 25 },
    { name: 'Ecommerce', value: 15 },
  ],
  West: [
    { name: 'Retail', value: 49 },
    { name: 'On-Premise', value: 33 },
    { name: 'Ecommerce', value: 18 },
  ],
};

const RANGE_OPTIONS = [
  { id: '6M', label: 'Last 6M', months: 6 },
  { id: '12M', label: '12M', months: 12 },
];

const METRIC_OPTIONS: { id: MetricKey; label: string }[] = [
  { id: 'revenue', label: 'Revenue' },
  { id: 'cases', label: 'Cases' },
  { id: 'margin', label: 'Margin %' },
];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const formatCurrency = (value: number) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const formatNumber = (value: number) => value.toLocaleString('en-US');

const formatPercent = (value: number, digits = 0) => `${(value * 100).toFixed(digits)}%`;

const formatDelta = (value: number) => {
  if (!Number.isFinite(value)) {
    return '0.0%';
  }
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

export const Dashboard = () => {
  const [region, setRegion] = useState('National');
  const [channel, setChannel] = useState('All');
  const [metric, setMetric] = useState<MetricKey>('revenue');
  const [range, setRange] = useState('12M');
  const [activeIndex, setActiveIndex] = useState(BASE_SERIES.length - 1);

  const rangeConfig = RANGE_OPTIONS.find((option) => option.id === range) ?? RANGE_OPTIONS[1];

  const series = useMemo(() => {
    const regionFactor = REGION_FACTORS[region] ?? 1;
    const channelFactor = CHANNEL_FACTORS[channel] ?? 1;
    const marginAdjust = CHANNEL_MARGIN_ADJUST[channel] ?? 0;
    const regionPenalty = region === 'Midwest' ? 0.01 : 0;

    return BASE_SERIES.map((item) => {
      const revenue = Math.round(item.revenue * regionFactor * channelFactor);
      const cases = Math.round(item.cases * regionFactor * channelFactor);
      const orders = Math.max(12, Math.round(item.orders * regionFactor * channelFactor));
      const accounts = Math.max(
        18,
        Math.round(item.accounts * regionFactor * (channel === 'All' ? 1 : 0.7)),
      );
      const margin = clamp(item.margin + marginAdjust - regionPenalty, 0.24, 0.45);

      return {
        ...item,
        revenue,
        cases,
        orders,
        accounts,
        margin,
      };
    });
  }, [region, channel]);

  const visibleSeries = useMemo(
    () => series.slice(-rangeConfig.months),
    [series, rangeConfig.months],
  );

  useEffect(() => {
    setActiveIndex(visibleSeries.length - 1);
  }, [visibleSeries.length, region, channel, rangeConfig.id]);

  const clampedIndex = Math.min(activeIndex, Math.max(visibleSeries.length - 1, 0));
  const activeMonth = visibleSeries[clampedIndex] ?? visibleSeries[visibleSeries.length - 1];

  const totals = useMemo(() => {
    const totalRevenue = visibleSeries.reduce((sum, item) => sum + item.revenue, 0);
    const totalCases = visibleSeries.reduce((sum, item) => sum + item.cases, 0);
    const totalOrders = visibleSeries.reduce((sum, item) => sum + item.orders, 0);
    const avgAccounts =
      visibleSeries.reduce((sum, item) => sum + item.accounts, 0) / visibleSeries.length;
    const weightedMargin =
      visibleSeries.reduce((sum, item) => sum + item.margin * item.revenue, 0) /
      Math.max(totalRevenue, 1);
    const avgFillRate =
      visibleSeries.reduce((sum, item) => sum + item.fillRate, 0) / visibleSeries.length;

    return {
      totalRevenue,
      totalCases,
      totalOrders,
      avgAccounts: Math.round(avgAccounts),
      avgMargin: weightedMargin,
      avgFillRate,
      avgOrderValue: totalOrders ? totalRevenue / totalOrders : 0,
      avgPricePerCase: totalCases ? totalRevenue / totalCases : 0,
    };
  }, [visibleSeries]);

  const deltas = useMemo(() => {
    const last = visibleSeries[visibleSeries.length - 1];
    const previous = visibleSeries[visibleSeries.length - 2] ?? last;
    const revenueDelta = ((last.revenue - previous.revenue) / Math.max(previous.revenue, 1)) * 100;
    const casesDelta = ((last.cases - previous.cases) / Math.max(previous.cases, 1)) * 100;
    const marginDelta = ((last.margin - previous.margin) / Math.max(previous.margin, 1)) * 100;
    const accountsDelta =
      ((last.accounts - previous.accounts) / Math.max(previous.accounts, 1)) * 100;
    const orderDelta = ((last.orders - previous.orders) / Math.max(previous.orders, 1)) * 100;
    const fillDelta = ((last.fillRate - previous.fillRate) / Math.max(previous.fillRate, 0.01)) * 100;

    return {
      revenueDelta,
      casesDelta,
      marginDelta,
      accountsDelta,
      orderDelta,
      fillDelta,
    };
  }, [visibleSeries]);

  const wines = useMemo(() => {
    const factor = (REGION_FACTORS[region] ?? 1) * (CHANNEL_FACTORS[channel] ?? 1);
    const scaled = TOP_WINES.map((wine) => ({
      ...wine,
      revenue: Math.round(wine.revenue * factor),
      cases: Math.round(wine.cases * factor),
    }));
    const totalWineRevenue = scaled.reduce((sum, wine) => sum + wine.revenue, 0);
    return scaled.map((wine) => ({
      ...wine,
      share: totalWineRevenue ? Math.round((wine.revenue / totalWineRevenue) * 100) : 0,
    }));
  }, [region, channel]);

  const channelMix = useMemo(() => {
    if (channel !== 'All') {
      return [{ name: channel, value: 100 }];
    }
    return CHANNEL_MIX_BY_REGION[region] ?? CHANNEL_MIX_BY_REGION.National;
  }, [channel, region]);

  const accountPulse = useMemo(() => {
    const regionFactor = REGION_FACTORS[region] ?? 1;
    const channelFactor = CHANNEL_FACTORS[channel] ?? 1;
    const openOrders = Math.max(8, Math.round((totals.totalOrders / rangeConfig.months) * 0.22));
    const lateInvoices = Math.max(3, Math.round((totals.totalOrders / rangeConfig.months) * 0.08));
    const inventoryDays = Math.round(32 + (1 - regionFactor) * 10 + (1 - channelFactor) * 18);
    const backorderRate = clamp(0.04 + (channel === 'On-Premise' ? 0.02 : 0), 0.03, 0.12);

    return {
      openOrders,
      lateInvoices,
      inventoryDays,
      backorderRate,
    };
  }, [region, channel, totals.totalOrders, rangeConfig.months]);

  const metricValues = visibleSeries.map((item) =>
    metric === 'margin' ? item.margin * 100 : item[metric],
  );
  const maxMetric = Math.max(...metricValues, 1);

  return (
    <section id="dashboard" className="py-[140px] relative z-10">
      <div className="max-w-[1100px] mx-auto px-[60px]">
        <div className="reveal">
          <div className="text-[10px] tracking-[6px] uppercase text-[var(--gold)] mb-4">
            QB Dashboard
          </div>
          <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(36px,5vw,58px)] font-light text-[var(--cream)] leading-[1.15]">
            Wine sales <em className="italic text-[var(--gold)]">dashboard.</em>
          </h2>
          <Ornament />
          <p className="text-[14px] text-[var(--text-dim)] leading-[1.9] max-w-[640px]">
            A fictional QuickBooks-style sales command center with live filters and scenario controls.
            Built to show how a real QB sync can look once you land the next account.
          </p>
        </div>

        <div className="mt-12 bg-[var(--bg2)] border border-[var(--border)] px-8 py-10 md:px-10 relative overflow-hidden reveal">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-[60px] right-[-40px] w-[240px] h-[240px] bg-[radial-gradient(circle,rgba(201,168,76,0.12),transparent_70%)]" />
            <div className="absolute -bottom-[80px] left-[-60px] w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(201,168,76,0.08),transparent_70%)]" />
          </div>

          <div className="relative">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <div className="text-[11px] tracking-[4px] uppercase text-[var(--cream)]">
                  QB Sales Console
                </div>
                <span className="text-[9px] tracking-[2px] uppercase text-[var(--gold)] border border-[var(--gold-dim)] px-[10px] py-[4px]">
                  Demo Data
                </span>
              </div>
              <div className="text-[11px] text-[var(--text-dim)] tracking-[2px] uppercase">
                Data is simulated for portfolio use
              </div>
            </div>

            <div className="mt-6 grid lg:grid-cols-[1.3fr_1fr_1fr] gap-6">
              <FilterGroup
                label="Region"
                options={['National', 'Northeast', 'Midwest', 'West']}
                active={region}
                onChange={setRegion}
              />
              <FilterGroup
                label="Channel"
                options={['All', 'Retail', 'On-Premise', 'Ecommerce']}
                active={channel}
                onChange={setChannel}
              />
              <FilterGroup
                label="Range"
                options={RANGE_OPTIONS.map((option) => option.id)}
                active={range}
                onChange={setRange}
                labels={{ '6M': 'Last 6M', '12M': '12M' }}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-8">
              <KpiCard
                label="Total Revenue"
                value={formatCurrency(totals.totalRevenue)}
                delta={`${formatDelta(deltas.revenueDelta)} vs prior month`}
                highlight
              />
              <KpiCard
                label="Cases Shipped"
                value={formatNumber(totals.totalCases)}
                delta={`${formatDelta(deltas.casesDelta)} vs prior month`}
              />
              <KpiCard
                label="Gross Margin"
                value={formatPercent(totals.avgMargin, 1)}
                delta={`${formatDelta(deltas.marginDelta)} vs prior month`}
              />
              <KpiCard
                label="Active Accounts"
                value={formatNumber(totals.avgAccounts)}
                delta={`${formatDelta(deltas.accountsDelta)} vs prior month`}
              />
              <KpiCard
                label="Avg Order Value"
                value={formatCurrency(totals.avgOrderValue)}
                delta={`${formatDelta(deltas.orderDelta)} vs prior month`}
              />
              <KpiCard
                label="Fill Rate"
                value={formatPercent(totals.avgFillRate, 1)}
                delta={`${formatDelta(deltas.fillDelta)} vs prior month`}
              />
            </div>

            <div className="grid lg:grid-cols-[2.2fr_1fr] gap-6 mt-8">
              <div className="bg-[var(--bg)] border border-[var(--border)] p-6 relative overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="text-[10px] tracking-[4px] uppercase text-[var(--gold-dim)]">
                      Monthly Trend
                    </div>
                    <div className="font-['Cormorant_Garamond',serif] text-[22px] text-[var(--cream)]">
                      {metric === 'revenue' && 'Revenue'}
                      {metric === 'cases' && 'Cases shipped'}
                      {metric === 'margin' && 'Gross margin'}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {METRIC_OPTIONS.map((option) => (
                      <ToggleButton
                        key={option.id}
                        active={metric === option.id}
                        onClick={() => setMetric(option.id)}
                      >
                        {option.label}
                      </ToggleButton>
                    ))}
                  </div>
                </div>

                <div className="mt-8 h-[240px] flex items-end gap-3">
                  {visibleSeries.map((item, index) => {
                    const value = metricValues[index];
                    const height = Math.max(6, (value / maxMetric) * 100);
                    const isActive = index === clampedIndex;
                    const label =
                      metric === 'margin'
                        ? formatPercent(item.margin, 1)
                        : metric === 'revenue'
                          ? formatCurrency(item.revenue)
                          : `${formatNumber(item.cases)} cases`;

                    return (
                      <div key={item.month} className="flex-1 flex flex-col items-center gap-3">
                        <button
                          type="button"
                          className={`w-full rounded-sm transition-all duration-300 ${
                            isActive
                              ? 'bg-[var(--gold)] shadow-[0_0_18px_rgba(201,168,76,0.35)]'
                              : 'bg-[var(--border-hover)] hover:bg-[var(--gold-dim)]'
                          }`}
                          style={{ height: `${height}%`, minHeight: '8px' }}
                          onClick={() => setActiveIndex(index)}
                          title={`${item.month}: ${label}`}
                          aria-pressed={isActive}
                        />
                        <span
                          className={`text-[10px] tracking-[2px] uppercase ${
                            isActive ? 'text-[var(--gold)]' : 'text-[var(--text-dim)]'
                          }`}
                        >
                          {item.month}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="bg-[var(--bg)] border border-[var(--border)] p-6">
                  <div className="text-[10px] tracking-[4px] uppercase text-[var(--gold-dim)]">
                    Month Snapshot
                  </div>
                  <div className="font-['Cormorant_Garamond',serif] text-[22px] text-[var(--cream)]">
                    {activeMonth?.month} performance
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-5">
                    <SnapshotItem label="Revenue" value={formatCurrency(activeMonth?.revenue ?? 0)} />
                    <SnapshotItem label="Cases" value={formatNumber(activeMonth?.cases ?? 0)} />
                    <SnapshotItem
                      label="Margin"
                      value={formatPercent(activeMonth?.margin ?? 0, 1)}
                    />
                    <SnapshotItem label="Orders" value={formatNumber(activeMonth?.orders ?? 0)} />
                    <SnapshotItem label="Accounts" value={formatNumber(activeMonth?.accounts ?? 0)} />
                    <SnapshotItem label="Fill Rate" value={formatPercent(activeMonth?.fillRate ?? 0, 1)} />
                  </div>
                </div>

                <div className="bg-[var(--bg)] border border-[var(--border)] p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] tracking-[4px] uppercase text-[var(--gold-dim)]">
                      Channel Mix
                    </div>
                    <div className="text-[10px] tracking-[2px] text-[var(--text-dim)] uppercase">
                      {channel === 'All' ? 'Share of revenue' : 'Filtered view'}
                    </div>
                  </div>
                  <div className="mt-5 flex flex-col gap-4">
                    {channelMix.map((item) => (
                      <div key={item.name}>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-[var(--cream)]">{item.name}</span>
                          <span className="text-[var(--gold)]">{item.value}%</span>
                        </div>
                        <div className="mt-2 h-[6px] bg-[var(--border)]">
                          <div
                            className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mt-6">
              <div className="bg-[var(--bg)] border border-[var(--border)] p-6">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] tracking-[4px] uppercase text-[var(--gold-dim)]">
                    Top Wines
                  </div>
                  <div className="text-[10px] tracking-[2px] text-[var(--text-dim)] uppercase">
                    Ranked by revenue
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-5">
                  {wines.map((wine) => (
                    <div key={wine.name}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="text-[12px] text-[var(--cream)]">{wine.name}</div>
                          <div className="text-[10px] tracking-[2px] uppercase text-[var(--text-dim)]">
                            {wine.origin}
                          </div>
                        </div>
                        <div className="text-[12px] text-[var(--gold)]">
                          {formatCurrency(wine.revenue)}
                        </div>
                      </div>
                      <div className="mt-3 h-[6px] bg-[var(--border)]">
                        <div
                          className="h-full bg-[var(--gold-dim)]"
                          style={{ width: `${wine.share}%` }}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-[var(--text-dim)]">
                        <span>{formatNumber(wine.cases)} cases</span>
                        <span>{wine.growth >= 0 ? `+${wine.growth}` : wine.growth}% growth</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[var(--bg)] border border-[var(--border)] p-6">
                <div className="text-[10px] tracking-[4px] uppercase text-[var(--gold-dim)]">
                  Account Pulse
                </div>
                <div className="font-['Cormorant_Garamond',serif] text-[22px] text-[var(--cream)]">
                  Operations health
                </div>
                <div className="grid grid-cols-2 gap-5 mt-6">
                  <PulseItem label="Open Orders" value={formatNumber(accountPulse.openOrders)} />
                  <PulseItem label="Late Invoices" value={formatNumber(accountPulse.lateInvoices)} />
                  <PulseItem label="Inventory Days" value={`${accountPulse.inventoryDays}d`} />
                  <PulseItem label="Backorder Rate" value={formatPercent(accountPulse.backorderRate, 1)} />
                </div>
                <div className="mt-6 text-[11px] text-[var(--text-dim)] leading-[1.7]">
                  Filters adjust operational metrics to demonstrate how dashboards can highlight risk
                  areas quickly.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FilterGroup = ({
  label,
  options,
  active,
  onChange,
  labels,
}: {
  label: string;
  options: string[];
  active: string;
  onChange: (value: string) => void;
  labels?: Record<string, string>;
}) => {
  return (
    <div className="bg-[var(--bg)] border border-[var(--border)] p-4">
      <div className="text-[10px] tracking-[4px] uppercase text-[var(--gold-dim)] mb-3">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <ToggleButton key={option} active={active === option} onClick={() => onChange(option)}>
            {labels?.[option] ?? option}
          </ToggleButton>
        ))}
      </div>
    </div>
  );
};

const ToggleButton = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`text-[10px] tracking-[3px] uppercase px-[14px] py-[8px] border transition-all duration-200 ${
        active
          ? 'bg-[var(--gold)] text-[var(--bg)] border-[var(--gold)]'
          : 'border-[var(--border-hover)] text-[var(--text-dim)] hover:border-[var(--gold-dim)] hover:text-[var(--gold)]'
      }`}
    >
      {children}
    </button>
  );
};

const KpiCard = ({
  label,
  value,
  delta,
  highlight,
}: {
  label: string;
  value: string;
  delta: string;
  highlight?: boolean;
}) => {
  return (
    <div
      className={`border p-5 transition-all duration-300 ${
        highlight
          ? 'bg-[var(--bg)] border-[var(--gold-dim)]'
          : 'bg-[var(--bg)] border-[var(--border)]'
      }`}
    >
      <div className="text-[10px] tracking-[4px] uppercase text-[var(--gold-dim)] mb-2">
        {label}
      </div>
      <div className="font-['Cormorant_Garamond',serif] text-[28px] text-[var(--cream)]">
        {value}
      </div>
      <div className="text-[10px] tracking-[2px] uppercase text-[var(--text-dim)] mt-2">
        {delta}
      </div>
    </div>
  );
};

const SnapshotItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <div className="text-[10px] tracking-[3px] uppercase text-[var(--gold-dim)]">{label}</div>
      <div className="text-[14px] text-[var(--cream)] mt-1">{value}</div>
    </div>
  );
};

const PulseItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="border border-[var(--border)] p-4">
      <div className="text-[10px] tracking-[3px] uppercase text-[var(--gold-dim)]">{label}</div>
      <div className="text-[16px] text-[var(--cream)] mt-2">{value}</div>
    </div>
  );
};
