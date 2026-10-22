import type { Fact, Source } from '@/lib/mdx'

const noteId = (scope: string, n: number) => `${scope}-src-${n}`

// Superscript footnote marker. Clicking it jumps to the source note, which
// highlights via :target; hovering shows the source text as a tooltip.
export function Cite({ n, scope, sources }: { n: number; scope: string; sources: Source[] }) {
  const source = sources[n - 1]
  return (
    <a href={`#${noteId(scope, n)}`} className="cite" title={source?.text} aria-label={`Source ${n}`}>
      {n}
    </a>
  )
}

export function FactTable({ facts, scope, sources }: { facts: Fact[]; scope: string; sources: Source[] }) {
  return (
    <dl className="border-t border-rule">
      {facts.map((fact) => (
        <div
          key={fact.label}
          className="grid grid-cols-[minmax(7rem,11rem)_1fr] gap-4 border-b border-rule py-3 items-baseline"
        >
          <dt className="font-sans text-sm font-medium text-muted">{fact.label}</dt>
          <dd className="font-sans text-base font-semibold tabular">
            {fact.value}
            {fact.cite && <Cite n={fact.cite} scope={scope} sources={sources} />}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export function SourceList({ sources, scope }: { sources: Source[]; scope: string }) {
  return (
    <div className="font-sans text-sm text-muted">
      <p className="font-semibold text-ink mb-2">Sources</p>
      <ol className="space-y-1">
        {sources.map((source, i) => (
          <li key={i} id={noteId(scope, i + 1)} className="source-note grid grid-cols-[1.5rem_1fr] -mx-2 px-2 py-0.5 rounded-sm">
            <span className="tabular font-semibold text-gold-ink">{i + 1}</span>
            <span>
              {source.href ? (
                <a href={source.href} className="link text-ink" target="_blank" rel="noopener noreferrer">
                  {source.text}
                </a>
              ) : (
                source.text
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
