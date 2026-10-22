import Link from 'next/link'
import { getLatestCommitDate } from '@/lib/github'
import { getAllProjects } from '@/lib/mdx'
import { FactTable, SourceList } from '@/components/Sources'
import FootballField from '@/components/FootballField'
import RunningLog from '@/components/RunningLog'
import SearchButton from '@/components/SearchButton'

export const revalidate = 3600

const EMAIL = 'hello@filippocappa.com'

const PROFILE = [
  {
    label: 'Studying',
    value: 'BSc Economics and Finance with Data Science, University of Turin. Taught in English, graduating in late 2028.',
  },
  {
    label: 'Building',
    value: 'Roen Labs, an adaptive training engine for road runners. Founder since September 2026, in private alpha.',
  },
  {
    label: 'Aiming for',
    value: "Investment banking, then a master's in finance.",
  },
]

const TOOLS = ['Python', 'pandas and NumPy', 'SQL (Postgres)', 'Excel', 'FastAPI', 'TypeScript and Next.js', 'Swift']

export default async function Home() {
  const projects = getAllProjects()
  const commitDate = await getLatestCommitDate()

  return (
    <main>
      {/* Cover */}
      <header className="border-b-[3px] border-ink">
        <div className="max-w-site mx-auto px-page min-h-[min(92svh,64rem)] flex flex-col">
          <nav className="flex items-center justify-end sm:justify-between gap-6 py-5 font-sans text-sm" aria-label="Main">
            <span className="hidden sm:inline text-muted">Turin, Italy</span>
            <div className="flex items-center gap-5 sm:gap-7">
              <a href="#work" className="hover:text-accent">Work</a>
              <a href="#about" className="hover:text-accent">About</a>
              <a href="#contact" className="hover:text-accent">Contact</a>
              <SearchButton className="hover:text-accent" />
            </div>
          </nav>

          <div className="flex-1 flex flex-col justify-end pt-[10vh] pb-12">
            <div className="grid lg:grid-cols-12 gap-x-8 items-end">
              <h1 className="lg:col-span-7 font-sans condensed font-extrabold text-display">
                <span className="block overflow-hidden pb-[0.04em]">
                  <span className="rise">Filippo</span>
                </span>
                <span className="block overflow-hidden pb-[0.04em]">
                  <span className="rise" style={{ animationDelay: '120ms' }}>Cappa</span>
                </span>
              </h1>
              <p className="settle lg:col-span-5 text-lead mt-8 lg:mt-0 lg:mb-[0.6em] max-w-[38ch]">
                Economics and finance student in Turin, aiming for investment banking. I build things to test how I
                reason: a training engine for runners, a deal valuation model, and my own assistant.
              </p>
            </div>

            <div className="settle">
              <dl className="mt-12 grid gap-6 sm:grid-cols-3 border-t border-rule pt-6 font-sans">
                {PROFILE.map((row) => (
                  <div key={row.label}>
                    <dt className="text-sm text-muted font-semibold">{row.label}</dt>
                    <dd className="mt-1 text-[0.95rem] leading-snug max-w-[34ch]">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 font-sans">
                <a href={`mailto:${EMAIL}`} className="bg-ink text-paper font-semibold px-5 py-3 rounded-[2px] hover:bg-accent">
                  Email me
                </a>
                <a href="https://www.linkedin.com/in/filippo-cappa" className="link" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="https://github.com/filippocappa" className="link" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </div>

              <p className="mt-14 max-w-[52ch] font-sans text-sm text-muted">
                Every figure on this site has a small blue number next to it. Select it to see where the figure comes
                from.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Work */}
      <section id="work" className="max-w-site mx-auto px-page pt-24 scroll-mt-4">
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-4 mb-16">
          <h2 className="lg:col-span-4 font-sans condensed font-extrabold text-h2 text-ink">Work</h2>
          <p className="lg:col-span-8 text-lead max-w-prose">
            One company, one piece of finance work, one tool I built for myself. Each started from a question I
            wanted answered properly.
          </p>
        </div>

        {projects.map(({ slug, frontmatter: p }) => (
          <article key={slug} className="grid lg:grid-cols-12 gap-x-8 gap-y-8 border-t-[3px] border-ink pt-6 pb-24">
            <div className="lg:col-span-4">
              <p className="font-sans text-sm font-semibold flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-accent" aria-hidden />
                {p.status}
              </p>
              <h3 className="mt-3 font-sans condensed font-extrabold text-title text-ink">
                <Link href={`/work/${slug}`} className="hover:text-accent">
                  {p.title}
                </Link>
              </h3>
              <dl className="mt-6 space-y-3 font-sans text-sm">
                <div>
                  <dt className="text-muted">Role</dt>
                  <dd>{p.role}</dd>
                </div>
                <div>
                  <dt className="text-muted">When</dt>
                  <dd>{p.period}</dd>
                </div>
                <div>
                  <dt className="text-muted">Built with</dt>
                  <dd>{p.stack.join(', ')}</dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-8 space-y-8 min-w-0">
              <p className="text-lead max-w-prose">{p.summary}</p>
              <FactTable facts={p.facts} scope={slug} sources={p.sources} />
              {slug === 'deal-autopsy' && <FootballField />}
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 font-sans">
                <Link
                  href={`/work/${slug}`}
                  className="bg-ink text-paper font-semibold px-5 py-3 rounded-[2px] hover:bg-accent"
                >
                  Read about {p.title}
                </Link>
                {p.links?.map((l) => (
                  <a key={l.href} href={l.href} className="link" target="_blank" rel="noopener noreferrer">
                    {l.label}
                  </a>
                ))}
              </div>
              <SourceList sources={p.sources} scope={slug} />
            </div>
          </article>
        ))}
      </section>

      {/* About */}
      <section id="about" className="max-w-site mx-auto px-page pb-24 scroll-mt-4">
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-8 border-t-[3px] border-ink pt-6">
          <h2 className="lg:col-span-4 font-sans condensed font-extrabold text-h2 text-ink">About</h2>
          <div className="lg:col-span-8 space-y-12">
            <div className="max-w-prose space-y-5">
              <p>
                What draws me to finance is how valuation turns uncertain information into a number you can defend. I
                like testing that kind of reasoning with data and code rather than only reading about it, so most of
                what I build has the same shape: explicit assumptions, rules that can be checked, and results that
                can be reproduced.
              </p>
              <p>
                I&apos;m in the second year of an English-taught degree in Economics and Finance with Data Science at
                the University of Turin, and I plan to go on to a master&apos;s in finance. Before university I
                studied applied sciences at Liceo Gramsci in Ivrea.
              </p>
              <p>
                Outside class I run, and Roen Labs started there. I wanted a training plan that reacted to how my
                weeks actually went and couldn&apos;t find one I trusted, so I built it.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2">
              <div className="font-sans">
                <p className="font-semibold mb-3">What I work with</p>
                <ul className="grid grid-cols-2 gap-x-6 border-t border-rule">
                  {TOOLS.map((tool) => (
                    <li key={tool} className="border-b border-rule py-2">{tool}</li>
                  ))}
                </ul>
              </div>
              <RunningLog />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer id="contact" className="bg-surface border-t border-rule scroll-mt-4">
        <div className="max-w-site mx-auto px-page pt-20 pb-10">
          <div className="grid lg:grid-cols-12 gap-x-8 gap-y-6">
            <h2 className="lg:col-span-4 font-sans condensed font-extrabold text-h2">Contact</h2>
            <div className="lg:col-span-8">
              <p className="text-lead max-w-[44ch]">
                I&apos;d like to talk with people working in investment banking. Email is the fastest way to reach me.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-8 inline-block font-sans condensed font-extrabold text-[clamp(1.75rem,6vw,4.5rem)] leading-none break-words hover:text-accent"
              >
                {EMAIL}
              </a>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 font-sans">
                <a href="https://www.linkedin.com/in/filippo-cappa" className="link" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
                <a href="https://github.com/filippocappa" className="link" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a href="https://www.roenlabs.com" className="link" target="_blank" rel="noopener noreferrer">
                  Roen Labs
                </a>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-5 border-t border-rule flex flex-wrap justify-between gap-3 font-sans text-sm text-muted">
            <span>© {new Date().getFullYear()} Filippo Cappa</span>
            {commitDate && <span>Site last updated {commitDate}</span>}
          </div>
        </div>
      </footer>
    </main>
  )
}
