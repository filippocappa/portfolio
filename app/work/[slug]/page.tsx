import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getProjectData, getAllProjectSlugs } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { VolatilityChart } from '@/components/VolatilityChart'
import { FocusParagraph, FocusListItem } from '@/components/ScrollFocus'
import StravaStats from '@/components/StravaStats'
import { getActivities } from '@/lib/strava'

// Add custom components for MDX if needed
const components = {
  VolatilityChart,
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="mono-sm mb-12 opacity-50">{children}</h2>
  ),
  p: FocusParagraph,
  ul: ({ children }: { children: React.ReactNode }) => (
    <div className="mb-12">
      {children}
    </div>
  ),
  li: FocusListItem,
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectData(params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.abstract,
  }
}

async function StravaDataFetcher() {
  try {
    const activities = await getActivities(21)
    
    // Filter for runs (including TrailRun and VirtualRun for robustness)
    const runs = activities.filter((a: any) => 
      a.type === 'Run' || a.type === 'TrailRun' || a.type === 'VirtualRun'
    )
    
    if (activities.length > 0 && runs.length === 0) {
      return (
        <div className="my-16 p-8 bg-off-black/5 border border-accent/20 rounded-sm font-mono text-[10px] opacity-50 uppercase tracking-widest text-center">
          No runs detected in the last 21 days.
        </div>
      )
    }

    if (activities.length === 0) {
      return (
        <div className="my-16 p-8 bg-off-black/5 border border-accent/20 rounded-sm font-mono text-[10px] opacity-60 uppercase tracking-widest text-center">
          <p className="text-accent mb-2">Scope Permission Required</p>
          <p className="leading-relaxed">Ensure your token has <code className="text-off-black bg-accent/10 px-1">activity:read</code> scope.</p>
        </div>
      )
    }

    // Calculate totals for the last 21 days
    const totalDistance = runs.reduce((acc: number, a: any) => acc + a.distance, 0)
    const totalMovingTime = runs.reduce((acc: number, a: any) => acc + a.moving_time, 0)
    const totalElevation = runs.reduce((acc: number, a: any) => acc + a.total_elevation_gain, 0)
    
    // Calculate weekly averages (21 days = 3 weeks)
    const kmPerWeek = (totalDistance / 1000) / 3
    const elevationWeekly = totalElevation / 3
    
    // Calculate average pace (min/km)
    const avgPaceSecPerKm = totalMovingTime / (totalDistance / 1000)
    const mins = Math.floor(avgPaceSecPerKm / 60)
    const secs = Math.round(avgPaceSecPerKm % 60)
    const formattedPace = `${mins}:${secs.toString().padStart(2, '0')} /KM`

    return (
      <StravaStats 
        data={{
          kmPerWeek,
          avgPace: formattedPace,
          totalRuns: runs.length
        }} 
      />
    )
  } catch (error: any) {
    console.error('Strava Fetcher Error:', error.message)
    
    let errorMessage = 'Connection Pending'
    if (error.message.includes('REFRESH_ERROR_401')) {
      errorMessage = 'Invalid Refresh Token (Check .env)'
    } else if (error.message.includes('FETCH_ACTIVITIES_ERROR_401') || error.message.includes('FETCH_ACTIVITIES_ERROR_403')) {
      errorMessage = 'Missing Scope (activity:read)'
    } else if (error.message.includes('400')) {
      errorMessage = 'Bad Request to Strava'
    }

    return (
      <div className="my-16 p-8 bg-off-black/5 border border-red-500/10 rounded-sm font-mono text-[10px] opacity-50 uppercase tracking-widest text-center">
        Strava API Error: {errorMessage}
      </div>
    )
  }
}

export default async function WorkPage({ params }: { params: { slug: string } }) {
  const project = await getProjectData(params.slug)

  if (!project) {
    notFound()
  }

  const { frontmatter } = project
  const bgColor = frontmatter.theme === 'dark' ? 'bg-gray-950' : 'bg-cream'
  const textColor = frontmatter.theme === 'dark' ? 'text-cream' : 'text-off-black'
  const borderColor = frontmatter.theme === 'dark' ? 'border-cream/20' : 'border-off-black/20'
  const isRunningClub = params.slug === 'running-club'

  return (
    <main className={`min-h-screen ${bgColor} ${textColor}`}>
      {/* Header */}
      <header className={`px-page py-12 border-b ${borderColor}`}>
        <h1 className="font-inter-tight text-[14vw] md:text-[10vw] font-black tracking-tighter leading-[0.9] mb-6">
          {frontmatter.title}
        </h1>
        <p className="font-inter text-manifesto font-normal leading-relaxed max-w-[50ch] opacity-90">
          {frontmatter.abstract}
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
                <p className="font-mono text-sm">{frontmatter.role}</p>
              </div>
              <div>
                <p className="mono-sm opacity-50 mb-1">TIMELINE</p>
                <p className="font-mono text-sm">{frontmatter.timeline}</p>
              </div>
              <div>
                <p className="mono-sm opacity-50 mb-1">TECH STACK</p>
                <div className="flex flex-wrap gap-2">
                  {frontmatter.techStack.map((tech, i) => (
                    <span key={i} className="mono-sm opacity-70">
                      {tech}
                      {i < frontmatter.techStack.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </div>
              </div>
              {frontmatter.repoLink && (
                <div>
                  <p className="mono-sm opacity-50 mb-1">REPOSITORY</p>
                  <a
                    href={frontmatter.repoLink}
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
              {frontmatter.stats.map((stat, i) => (
                <div key={i} className={`pb-4 border-b ${borderColor}`}>
                  <p className="mono-sm opacity-50 mb-1">{stat.label.toUpperCase()}</p>
                  <p className="font-sans text-4xl font-bold tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strava Integration if Running Club */}
          {isRunningClub && <StravaDataFetcher />}
        </aside>

        {/* Main Content */}
        <article className="lg:col-span-8 space-y-16">
          <div className="prose prose-invert max-w-none">
            {/* @ts-ignore */}
            <MDXRemote source={project.content} components={components} />
          </div>

          {/* Image Gallery */}
          {frontmatter.images && frontmatter.images.length > 0 && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <h2 className="mono-sm col-span-full mb-2 opacity-50">GALLERY — CAPTURED</h2>
              {frontmatter.images.map((src: string, i: number) => (
                <div key={i} className={`relative overflow-hidden rounded-sm bg-off-black/5 ${i % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'}`}>
                  <Image
                    src={src}
                    alt={`${frontmatter.title} - Image ${i + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </section>
          )}

          {/* Footer CTA */}
          <section className={`pt-16 border-t ${borderColor}`}>
            <Link
              href="/"
              data-cursor-magnetic
              className="inline-block font-sans text-2xl font-bold tracking-tight"
            >
              ← Back to all work
            </Link>
          </section>
        </article>
      </div>
    </main>
  )
}
