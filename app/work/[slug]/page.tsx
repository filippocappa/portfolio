import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getProjectData, getAllProjectSlugs, getAllProjects } from '@/lib/mdx'
import { Cite, FactTable, SourceList } from '@/components/Sources'
import FootballField from '@/components/FootballField'
import SearchButton from '@/components/SearchButton'

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectData(params.slug)
  if (!project) return { title: 'Project not found' }
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
  }
}

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const project = await getProjectData(params.slug)
  if (!project) notFound()

  const { slug, frontmatter: p } = project
  const all = getAllProjects()
  const next = all[(all.findIndex((x) => x.slug === slug) + 1) % all.length]

  const components = {
    // MDX props arrive as strings: next-mdx-remote strips JS expressions such as n={2}.
    Cite: ({ n }: { n: string }) => <Cite n={Number(n)} scope={slug} sources={p.sources} />,
    FootballField,
  }

  return (
    <main>
      <header className="on-navy bg-navy text-paper">
        <div className="max-w-site mx-auto px-page">
          <nav className="flex items-center justify-between gap-6 py-5 font-sans text-sm" aria-label="Main">
            <Link href="/" className="font-semibold hover:text-gold">Filippo Cappa</Link>
            <div className="flex items-center gap-5 sm:gap-7">
              <Link href="/#work" className="hover:text-gold">Work</Link>
              <Link href="/#contact" className="hover:text-gold">Contact</Link>
              <SearchButton className="hover:text-gold" />
            </div>
          </nav>

          <div className="pt-16 pb-12">
            <p className="font-sans text-sm font-semibold flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-gold" aria-hidden />
              {p.status}
            </p>
            <h1 className="mt-4 font-sans condensed font-extrabold text-[clamp(3.5rem,11vw,9rem)] leading-[0.85]">
              {p.title}
            </h1>
            <p className="mt-8 text-lead max-w-[46ch]">{p.summary}</p>

            <dl className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-paper/25 pt-6 font-sans text-sm">
              <div>
                <dt className="text-gold font-semibold">Role</dt>
                <dd className="mt-1 text-paper/90">{p.role}</dd>
              </div>
              <div>
                <dt className="text-gold font-semibold">When</dt>
                <dd className="mt-1 text-paper/90">{p.period}</dd>
              </div>
              <div>
                <dt className="text-gold font-semibold">Built with</dt>
                <dd className="mt-1 text-paper/90">{p.stack.join(', ')}</dd>
              </div>
              {p.links && p.links.length > 0 && (
                <div>
                  <dt className="text-gold font-semibold">Links</dt>
                  <dd className="mt-1 space-y-1">
                    {p.links.map((l) => (
                      <a key={l.href} href={l.href} className="link block w-fit" target="_blank" rel="noopener noreferrer">
                        {l.label}
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </header>

      <div className="max-w-site mx-auto px-page py-16 grid lg:grid-cols-12 gap-x-8 gap-y-12">
        <aside className="lg:col-span-4 lg:order-2 lg:sticky lg:top-8 lg:self-start space-y-8">
          <div>
            <p className="font-sans font-semibold mb-3">At a glance</p>
            <FactTable facts={p.facts} scope={slug} sources={p.sources} />
          </div>
        </aside>

        <article className="lg:col-span-8 lg:order-1 min-w-0">
          {slug === 'deal-autopsy' && (
            <div className="mb-4">
              <FootballField />
            </div>
          )}
          <div className="case-prose max-w-prose">
            <MDXRemote source={project.content} components={components} />
          </div>

          <div className="mt-16 pt-6 border-t border-rule max-w-prose">
            <SourceList sources={p.sources} scope={slug} />
          </div>
        </article>
      </div>

      <footer className="border-t-[3px] border-navy">
        <div className="max-w-site mx-auto px-page py-12 flex flex-wrap items-end justify-between gap-6 font-sans">
          <Link href={`/work/${next.slug}`} className="group">
            <span className="block text-sm text-muted">Next project</span>
            <span className="block condensed font-extrabold text-h2 text-navy group-hover:text-gold-ink">
              {next.frontmatter.title}
            </span>
          </Link>
          <Link href="/" className="link">Back to the home page</Link>
        </div>
      </footer>
    </main>
  )
}
