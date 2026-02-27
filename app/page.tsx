import HeroReveal from '@/components/HeroReveal'
import Link from 'next/link'
import { getLatestCommitDate } from '@/lib/github'

export default async function Home() {
  const commitDate = await getLatestCommitDate()

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* HERO */}
      <section className="h-screen w-full flex flex-col justify-start items-start px-page pt-32 snap-center bg-cream text-off-black">
        <div className="hero-name">
          <h1 className="font-inter-tight text-[22vw] leading-[0.75] tracking-[-0.08em] font-semibold">
            <HeroReveal delay={0}>Filippo</HeroReveal>
          </h1>
          <h1 className="font-inter-tight text-[22vw] leading-[0.75] tracking-[-0.08em] font-semibold">
            <HeroReveal delay={150}>Cappa</HeroReveal>
          </h1>
        </div>
      </section>

      {/* ABOUT / MANIFESTO */}
      <section className="h-screen grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 px-page py-section snap-center bg-cream text-off-black">
        <div className="pt-1">
          <span className="font-geist-mono text-mono-sm">001 — About</span>
        </div>
        <div className="flex flex-col justify-center h-full">
          <p className="font-inter text-manifesto font-normal leading-relaxed tracking-tight max-w-[60ch]">
            I believe the most interesting problems sit at the intersection of
            markets, mathematics, and human behaviour. I study economics not
            as theory but as a lens — sharpened by data, tested by code, and
            driven by an obsession with how systems actually work. My work
            moves between financial modelling, community building, and the
            quiet discipline of turning noise into signal.
          </p>
        </div>
      </section>

      {/* SELECTED WORK — Heading and Overview */}
      <section className="h-screen flex flex-col justify-center items-start px-page py-12 snap-center bg-cream text-off-black">
        <div className="mb-12">
          <span className="font-geist-mono text-mono-sm">002 — Selected Work</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full">
          <Link href="/work/running-club" data-cursor-magnetic className="group block pb-4 border-b border-off-black/10">
            <span className="font-geist-mono text-[10px] opacity-40 block mb-2">01 / COMMUNITY</span>
            <h2 className="font-inter-tight text-4xl md:text-5xl lg:text-[5vw] leading-[0.85] tracking-tight font-black uppercase group-hover:text-accent transition-colors">
              The<br />Running<br />Club
            </h2>
          </Link>
          <Link href="/work/financial-modelling" data-cursor-magnetic className="group block pb-4 border-b border-off-black/10">
            <span className="font-geist-mono text-[10px] opacity-40 block mb-2">02 / QUANTITATIVE</span>
            <h2 className="font-inter-tight text-4xl md:text-5xl lg:text-[5vw] leading-[0.85] tracking-tight font-black uppercase group-hover:text-accent transition-colors">
              Financial<br />Modelling
            </h2>
          </Link>
          <Link href="/work/econometric-analysis" data-cursor-magnetic className="group block pb-4 border-b border-off-black/10">
            <span className="font-geist-mono text-[10px] opacity-40 block mb-2">03 / STATISTICS</span>
            <h2 className="font-inter-tight text-4xl md:text-5xl lg:text-[5vw] leading-[0.85] tracking-tight font-black uppercase group-hover:text-accent transition-colors">
              Econometric<br />Analysis
            </h2>
          </Link>
          <div className="hidden md:flex items-end justify-end pb-4 border-b border-off-black/10 opacity-20">
            <span className="font-geist-mono text-[10px] uppercase">End_Of_List [03]</span>
          </div>
        </div>
      </section>

      {/* SELECTED WORK — Panel 01 — Light */}
      <section
        className="h-screen block w-full snap-center bg-cream text-off-black"
        data-index="01"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-24 items-end h-full px-page py-20">
          <div className="flex flex-col justify-between h-full pt-8 pb-20">
            <span className="font-geist-mono text-mono-sm opacity-50">01</span>
            <h2 className="font-inter-tight text-work-title font-black tracking-tight leading-[0.92]">
              The<br />Running<br />Club
            </h2>
          </div>
          <div className="flex flex-col items-end gap-6 pb-20 text-right">
            <div className="flex gap-4 justify-end">
              <span className="font-geist-mono text-mono-sm opacity-50">Community</span>
              <span className="font-geist-mono text-mono-sm opacity-50">Logistics</span>
            </div>
            <p className="font-geist-mono text-mono-sm opacity-70 leading-relaxed max-w-[35ch]">
              Founded and scaled a university running community — from zero to
              weekly sessions, race logistics, and brand partnerships.
            </p>
            <Link href="/work/running-club" className="w-fit">
              <span
                data-cursor-magnetic
                className="relative z-10 inline-flex items-center gap-2 px-10 py-5 bg-accent text-off-black rounded-2xl font-inter-tight text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                Read case study
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SELECTED WORK — Panel 02 — Dark */}
      <section
        className="h-screen block w-full snap-center bg-gray-950 text-cream"
        data-index="02"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-24 items-end h-full px-page py-20">
          <div className="flex flex-col justify-between h-full pt-8 pb-20">
            <span className="font-geist-mono text-mono-sm opacity-50">02</span>
            <h2 className="font-inter-tight text-work-title font-black tracking-tight leading-[0.92]">
              Financial<br />Modelling
            </h2>
          </div>
          <div className="flex flex-col items-end gap-6 pb-20 text-right">
            <div className="flex gap-4 justify-end">
              <span className="font-geist-mono text-mono-sm opacity-50">Python</span>
              <span className="font-geist-mono text-mono-sm opacity-50">R</span>
            </div>
            <p className="font-geist-mono text-mono-sm opacity-70 leading-relaxed max-w-[35ch]">
              Built quantitative models for portfolio optimisation, risk analysis,
              and time-series forecasting using Python and R.
            </p>
            <Link href="/work/financial-modelling" className="w-fit">
              <span
                data-cursor-magnetic
                className="relative z-10 inline-flex items-center gap-2 px-10 py-5 bg-accent text-off-black rounded-2xl font-inter-tight text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                Read case study
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SELECTED WORK — Panel 03 — Dark (New) */}
      <section
        className="h-screen block w-full snap-center bg-gray-900 text-cream border-t border-white/5"
        data-index="03"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-24 items-end h-full px-page py-20">
          <div className="flex flex-col justify-between h-full pt-8 pb-20">
            <span className="font-geist-mono text-mono-sm opacity-50">03</span>
            <h2 className="font-inter-tight text-work-title font-black tracking-tight leading-[0.92]">
              Econometric<br />Analysis
            </h2>
          </div>
          <div className="flex flex-col items-end gap-6 pb-20 text-right">
            <div className="flex gap-4 justify-end">
              <span className="font-geist-mono text-mono-sm opacity-50">Stata</span>
              <span className="font-geist-mono text-mono-sm opacity-50">R</span>
            </div>
            <p className="font-geist-mono text-mono-sm opacity-70 leading-relaxed max-w-[35ch]">
              Utilised advanced statistical methods to analyse consumer behaviour and market trends during economic shifts.
            </p>
            <Link href="/work/econometric-analysis" className="w-fit">
              <span
                data-cursor-magnetic
                className="relative z-10 inline-flex items-center gap-2 px-10 py-5 bg-accent text-off-black rounded-2xl font-inter-tight text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                Read case study
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 gap-8 px-page py-section snap-center bg-cream text-off-black">
        <div className="flex flex-col justify-between h-full">
          <div>
            <span className="font-geist-mono text-mono-sm">003 — Contact</span>
          </div>
          <div className="mb-4">
            <h2 className="font-inter-tight text-contact-heading font-black tracking-tight leading-tight mb-4">
              Let&apos;s talk.
            </h2>
            <p className="font-inter text-lg leading-relaxed max-w-[40ch]">
              Reach out if you're interested in collaborating on a project, discussing data, or just connecting.
            </p>
          </div>
        </div>
        <div className="justify-self-end self-end w-full max-w-md">
          <div className="flex flex-col items-end gap-4">
            <a
              href="mailto:hello@filippocappa.com"
              data-cursor-magnetic
              className="relative z-10 font-geist-mono text-lg inline-block w-fit pb-[2px] border-b border-transparent hover:border-accent hover:text-accent"
            >
              hello@filippocappa.com
            </a>
            <a
              href="https://www.linkedin.com/in/filippo-cappa"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-magnetic
              className="relative z-10 font-geist-mono text-lg inline-block w-fit pb-[2px] border-b border-transparent hover:border-accent hover:text-accent"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/filippocappa"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-magnetic
              className="relative z-10 font-geist-mono text-lg inline-block w-fit pb-[2px] border-b border-transparent hover:border-accent hover:text-accent"
            >
              GitHub ↗
            </a>
            <div className="mt-8 pt-8 border-t border-off-black/10 w-full flex justify-end">
              <a
                href="/cv-filippo-cappa.pdf" 
                download
                className="relative z-10 inline-flex items-center gap-2 px-10 py-5 bg-accent text-off-black rounded-2xl font-inter-tight text-lg font-bold transition-all duration-300 hover:scale-105 active:scale-95 group"
                data-cursor-magnetic
              >
                Download CV
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex justify-between items-center px-page py-6 pb-12 bg-cream text-off-black">
        <div className="flex items-center gap-6">
          <span className="font-geist-mono text-mono-sm opacity-50">© {new Date().getFullYear()} Filippo Cappa</span>
          {commitDate && (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-green rounded-full animate-pulse shadow-[0_0_8px_#10B981]" />
              <span className="font-geist-mono text-[9px] opacity-30 uppercase tracking-[0.2em]">Update: {commitDate}</span>
            </div>
          )}
        </div>
        <span className="font-geist-mono text-mono-sm opacity-50 uppercase tracking-widest">Built with rigor.</span>
      </footer>
    </main>
  )
}
