# Data Visualization and Chart Selection

Use this module when a UI task includes analytical charts, monitoring, reports, or encoded data. It complements `skills/enterprise-ui-ux/references/enterprise-patterns.md`. Choose a chart from the question and data structure, not from what looks impressive. Use a table or plain-language summary when that better serves lookup, precision, or decision-making.

## Start with the decision

Before choosing a visual form, identify:

1. The question the user needs to answer and the action that may follow.
2. The data type and relationship: category, time, rank, part-to-whole, distribution, relationship, geography, flow, schedule, or hierarchy.
3. Units, denominator, time range, aggregation, missing values, uncertainty, data freshness, and meaningful reference points.
4. The number of series/categories and the viewport, interaction, input method, and accessibility requirements.

If the chart does not reveal a comparison, trend, distribution, anomaly, relationship, or spatial pattern, remove it or show the number with context. A chart type is a recommendation, not evidence that the data supports that encoding.

## Chart selection guide

| User question | Useful starting forms | Fit and limits |
|---|---|---|
| What is this exact value or record? | Table, detail list, labeled value | Best for lookup and precise reading. A table can add a small in-cell bar or trend only when it strengthens comparison. |
| How does one value compare across categories? | Sorted horizontal bar, column, dot plot | Use horizontal bars for long labels and rankings. Column charts suit a small set of ordered categories. Keep a meaningful baseline for length encoding. |
| How do several series compare by category? | Grouped bar/column, dot plot, small multiples | Keep series count manageable; use direct labels or consistent color and shape. Avoid stacked bars if precise comparison of internal segments is central. |
| How does a measure change over time? | Line chart, column chart for discrete periods | Lines fit continuous ordered time. Show intervals, missing spans, and units. Avoid connecting unrelated categories or implying continuity that is absent. |
| How does a total accumulate or split over time? | Area, stacked area, stacked column | Use only when the total and component contributions matter. Stacks make middle-series comparisons difficult; use small multiples when exact series comparison matters. |
| How much does each part contribute to a whole? | 100% stacked bar, stacked bar, simple table; pie/donut in limited cases | Stacked bar preserves comparison; 100% stacking emphasizes proportions. Pie/donut can suit a few clear, non-negative parts of one whole, but becomes hard to compare as segments multiply. |
| How are values distributed? | Histogram, box plot, dot/strip plot; violin when audience understands it | Histogram shows frequency by bins; box plots compare spread and outliers compactly. Explain the statistic and avoid hiding important points behind summaries. |
| Do two quantitative variables move together? | Scatter plot; binned or hexagonal density for many points | Supports relationships and clusters, not causation. Use opacity/jitter/bins where points overlap and describe uncertainty or confounders where relevant. |
| Is there a relationship across two categorical dimensions? | Heatmap or matrix table | Use a sequential scale for magnitude or diverging scale around a meaningful midpoint. Provide exact values on demand and do not rely on color alone. |
| What is the order or rank? | Sorted bar or dot plot | Use a consistent scale, clear ties, and the right denominator. Use a table if exact positions or many attributes matter. |
| Where are values or events located? | Symbol/location map, locator map, choropleth map | Use maps only when location changes the decision. A choropleth is generally about normalized rates or shares by region, not raw totals across unequal population/area. Preserve a table or searchable list for exact access. |
| How does material move through stages or groups? | Sankey/alluvial for a small flow set; a table or flow list for detail | Use when links and quantities are the point. Limit crossings and categories; do not use a flow chart as decoration. |
| How does a value change across ordered stages? | Funnel only for a real sequential process; step table or conversion bars | State each stage’s denominator and drop-off. A funnel shape alone does not prove that stages are sequential or comparable. |
| When do tasks overlap or finish? | Timeline, Gantt-style view, calendar | Add accessible text/table alternatives, clear scale, status and dependency cues. Do not require color perception or dragging to understand or edit a schedule. |
| What belongs to a hierarchy? | Tree, treemap, indented list, sunburst | Prefer a list/tree when labels and exact comparison matter; area-based forms are compact but poor for precise comparisons. |
| Is the current number on target? | Labeled KPI with target/range, period, and comparison | Show units and context. Use a bullet/progress treatment when the target is meaningful; never use a gauge or color without a useful scale. |
| Is a compact item trending? | Sparkline next to a value and period | Useful as a secondary cue. Include accessible description, direction/scale context when interpretation depends on it, and a full detail path when users need the underlying values. |

These forms overlap. When two candidates fit, prefer the one that answers the question with fewer decoding steps and remains legible at the target width.

## Encoding and visual integrity

- Match the scale to the data type: categorical colors for distinct groups; sequential colors for ordered magnitude; diverging colors only around a real midpoint.
- Use position and length for precise comparison when possible. Avoid 3D distortion, decorative gradients, dual axes without a strong reason, and too many simultaneous encodings.
- Keep series identity stable across views. Never let the same hue represent different meanings in adjacent states without a clear scope.
- Label axes, units, periods, denominators, aggregation, and comparison baselines. Format values consistently with domain and locale conventions.
- Do not hide missing, partial, stale, estimated, or suppressed data. Explain the effect on the displayed result.
- Use tooltips as supplemental detail, not as the only source of essential values or interaction. Support keyboard focus and touch access.
- Design annotations to explain relevant events or thresholds. Make uncertainty and the source of the data discoverable when consequential.
- Do not animate values to simulate live change. On real updates, retain a clear final state and respect reduced motion.

## Accessibility and responsive behavior

Complex charts need a concise accessible name and a longer equivalent that communicates the essential structure and trend. Pair the visual with a summary, data table, or download/export path suitable to the task; ensure the information is available to screen-reader users, keyboard users, and people who cannot distinguish the colors. Do not flatten a chart into an unlabeled image and assume its title is an adequate alternative.

At narrow widths or zoom, reflow surrounding copy, filters, headings, and controls. A table or graph may need a locally scrollable or alternate view; do not make the entire page require two-dimensional scrolling when only one data region needs it. Validate labels, legends, touch/keyboard interactions, and long category names with representative values.

## Dashboard composition

- Start with the monitoring or decision task, not a grid of equally weighted KPI cards.
- Give each chart a question-driven title, time range, units, freshness, and visible filter context.
- Put comparisons, exceptions, and relevant actions near the data that informs them.
- Distinguish zero, missing, not applicable, loading, error, and no-result states.
- Use cross-highlighting or drill-down only when it preserves context and provides an exit/back path.
- Keep chart colors and scales consistent across related pages; document meaningful exceptions.

## Trust and evidence

Never fabricate sample values and present them as actual product facts. Use visibly synthetic fixtures for a prototype. A visualization critique based on code alone may identify a semantic mismatch in the encoding, but claims about what users understand should be checked with a rendered chart or user evidence. For chart accessibility, consult the W3C guidance on [complex images](https://www.w3.org/WAI/tutorials/images/complex/) and the applicable [WCAG version](https://www.w3.org/TR/WCAG22/). For chart families and comparison tasks, use a reference such as [Datawrapper’s chart-type guide](https://www.datawrapper.de/blog/chart-types-guide) as a starting aid rather than a universal specification.
