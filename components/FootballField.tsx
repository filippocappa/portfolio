// Valuation summary for Deal Autopsy. No deal is selected yet, so every
// range is drawn as an empty hatched track rather than an invented bar.
const METHODS = [
  { name: 'Trading comparables', basis: 'Multiples of listed peers' },
  { name: 'Precedent transactions', basis: 'Multiples paid in similar deals' },
  { name: 'Discounted cash flow', basis: 'WACC from CAPM, regression beta' },
  { name: 'Leveraged buyout', basis: 'Highest price at a target IRR' },
]

export default function FootballField() {
  return (
    <figure className="font-sans border border-rule bg-surface p-4 sm:p-6">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
        <span className="font-semibold">Valuation summary</span>
        <span className="text-sm text-muted">Implied value per share. Ranges appear once a deal is chosen.</span>
      </figcaption>
      <div className="relative">
        <div className="space-y-3">
          {METHODS.map((m) => (
            <div key={m.name} className="grid grid-cols-1 sm:grid-cols-[13rem_1fr] gap-1 sm:gap-4 items-center">
              <div>
                <div className="text-sm font-semibold">{m.name}</div>
                <div className="text-xs text-muted">{m.basis}</div>
              </div>
              <div className="hatch h-7 border border-dashed border-ink/25 flex items-center px-3">
                <span className="text-xs text-muted">Not computed yet</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span className="inline-block w-5 border-t-2 border-dashed border-accent" aria-hidden />
        Offer price, marked here once the deal is chosen
      </div>
    </figure>
  )
}
