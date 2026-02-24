import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug } from '@/lib/projects'

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    notFound()
  }

  // const bgColor = project.theme === 'dark' ? 'bg-charcoal' : 'bg-cream'
  // const textColor = project.theme === 'dark' ? 'text-cream' : 'text-charcoal'
  const bgColor = project.theme === 'dark' ? 'bg-gray-950' : 'bg-cream'
  const textColor = project.theme === 'dark' ? 'text-cream' : 'text-off-black'
  const borderColor = project.theme === 'dark' ? 'border-cream/20' : 'border-off-black/20'

  return (
    <main className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header */}
      <header className={`px-page py-12 border-b ${borderColor}`}>
        {/* Removed redundant Back to Home link */}
        <h1 className="font-inter-tight text-[14vw] md:text-[10vw] font-black tracking-tighter leading-[0.9] mb-6">
          {project.title}
        </h1>
        <p className="font-inter text-manifesto font-normal leading-relaxed max-w-[50ch] opacity-90">
          {project.abstract}
        </p>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-page py-section">
        {/* Sidebar (Sticky) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-8 lg:self-start space-y-12">
          {/* Metadata */}
          <div>
            <h3 className="mono-sm mb-4 opacity-50">METADATA</h3>
            <div className="space-y-4">
              <div>
                <p className="mono-sm opacity-50 mb-1">ROLE</p>
                <p className="font-mono text-sm">{project.role}</p>
              </div>
              <div>
                <p className="mono-sm opacity-50 mb-1">TIMELINE</p>
                <p className="font-mono text-sm">{project.timeline}</p>
              </div>
              <div>
                <p className="mono-sm opacity-50 mb-1">TECH STACK</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="mono-sm opacity-70">
                      {tech}
                      {i < project.techStack.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
              {project.repoLink && (
                <div>
                  <p className="mono-sm opacity-50 mb-1">REPOSITORY</p>
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm hover:text-accent transition-colors duration-300"
                  >
                    View on GitHub ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div>
            <h3 className="mono-sm mb-4 opacity-50">KEY METRICS</h3>
            <div className="space-y-4">
              {project.stats.map((stat, i) => (
                <div key={i} className={`pb-4 border-b ${borderColor}`}>
                  <p className="mono-sm opacity-50 mb-1">{stat.label.toUpperCase()}</p>
                  <p className="font-sans text-4xl font-bold tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <article className="lg:col-span-8 space-y-16">
          {/* Problem Statement */}
          <section>
            <h2 className="mono-sm mb-6 opacity-50">01 — PROBLEM STATEMENT</h2>
            <p className="font-sans text-manifesto font-normal leading-relaxed">
              {project.content.problemStatement}
            </p>
          </section>

          {/* Methodology */}
          <section>
            <h2 className="mono-sm mb-6 opacity-50">02 — METHODOLOGY</h2>
            <div className="space-y-6">
              {project.content.methodology.map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="mono-sm opacity-30 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="font-mono text-sm leading-relaxed opacity-90">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Outcomes */}
          <section>
            <h2 className="mono-sm mb-6 opacity-50">03 — OUTCOMES & IMPACT</h2>
            <div className="space-y-6">
              {project.content.outcomes.map((item, i) => (
                <div key={i} className="flex gap-6">
                  <span className="text-accent text-2xl flex-shrink-0">▲</span>
                  <p className="font-mono text-sm leading-relaxed opacity-90">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Footer CTA */}
          <section className={`pt-16 border-t ${borderColor}`}>
            <Link
              href="/"
              className="inline-block font-sans text-2xl font-bold tracking-tight hover:text-accent transition-colors duration-300"
            >
              ← Back to all work
            </Link>
          </section>
        </article>
      </div>
    </main>
  )
}
