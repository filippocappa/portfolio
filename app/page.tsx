import HeroReveal from '@/components/HeroReveal'
import Link from 'next/link'

export default function Home() {
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
        <div className="flex flex-col justify-center h-full"> {/* Added flex and justify-center */}
          <p className="font-inter text-manifesto font-normal leading-relaxed tracking-tight max-w-[60ch]"> {/* Increased max-w and set font-inter */}
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
      <section className="h-screen flex flex-col justify-center items-start px-page py-section snap-center bg-cream text-off-black">
        <div className="mb-8">
          <span className="font-geist-mono text-mono-sm">002 — Selected Work</span>
        </div>
        <div className="flex flex-col gap-6">
          <Link href="/work/running-club" className="block pb-4 mb-4 border-b border-off-black/10">
            <h2 className="font-inter-tight text-work-title leading-[0.92] tracking-tight font-black">
              The<br />Running<br />Club
            </h2>
          </Link>
          <Link href="/work/financial-modelling" className="block pb-4 mb-4 border-b border-off-black/10">
            <h2 className="font-inter-tight text-work-title leading-[0.92] tracking-tight font-black">
              Financial<br />Modelling
            </h2>
          </Link>
        </div>
      </section>

      {/* SELECTED WORK — Panel 01 — Light */}
      <section
        className="h-screen block w-full snap-center bg-cream text-off-black"
        data-index="01"
      >
        <Link
          href="/work/running-club"
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-24 items-end h-full px-page py-20"
        >
          <div className="flex flex-col justify-between h-full pt-8">
            <span className="font-geist-mono text-mono-sm opacity-50">01</span>
            <h2 className="font-inter-tight text-work-title font-black tracking-tight leading-[0.92]">
              The<br />Running<br />Club
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 pb-20">
            <div className="flex gap-4">
              <span className="font-geist-mono text-mono-sm opacity-50">Community</span>
              <span className="font-geist-mono text-mono-sm opacity-50">Logistics</span>
            </div>
            <p className="font-geist-mono text-mono-sm opacity-70 leading-relaxed max-w-[35ch]">
              Founded and scaled a university running community — from zero to
              weekly sessions, race logistics, and brand partnerships.
            </p>
            <span
              className="inline-block px-6 py-3 bg-accent text-off-black rounded-md font-inter-tight text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              Read case study →
            </span>          </div>
        </Link>
      </section>

      {/* SELECTED WORK — Panel 02 — Dark */}
      <section
        className="h-screen block w-full snap-center bg-gray-950 text-cream"
        data-index="02"
      >
        <Link
          href="/work/financial-modelling"
          className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-24 items-end h-full px-page py-20"
        >
          <div className="flex flex-col justify-between h-full pt-8">
            <span className="font-geist-mono text-mono-sm opacity-50">02</span>
            <h2 className="font-inter-tight text-work-title font-black tracking-tight leading-[0.92]">
              Financial<br />Modelling
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-6 pb-20">
            <div className="flex gap-4">
              <span className="font-geist-mono text-mono-sm opacity-50">Python</span>
              <span className="font-geist-mono text-mono-sm opacity-50">R</span>
            </div>
            <p className="font-geist-mono text-mono-sm opacity-70 leading-relaxed max-w-[35ch]">
              Built quantitative models for portfolio optimisation, risk analysis,
              and time-series forecasting using Python and R.
            </p>
            <span
              className="inline-block px-6 py-3 bg-accent text-off-black rounded-md font-inter-tight text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              Read case study →
            </span>          </div>
        </Link>
      </section>

      {/* CONTACT */}
      <section className="h-screen grid grid-cols-1 md:grid-cols-2 gap-8 px-page py-section snap-center bg-cream text-off-black">
        <div className="flex flex-col justify-between h-full">
          <div>
            <span className="font-geist-mono text-mono-sm">003 — Contact</span>
          </div>
          <div className="mb-4"> {/* Adjusted margin-bottom for better spacing */}
            <h2 className="font-inter-tight text-contact-heading font-black tracking-tight leading-tight mb-4">
              Let&apos;s talk.
            </h2>
            <p className="font-inter text-lg leading-relaxed max-w-[40ch]">
              Reach out if you're interested in collaborating on a project, discussing data, or just connecting.
            </p>
          </div>
        </div>
        <div className="justify-self-end self-end"> {/* Retained self-end to push to bottom */}
          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@filippocappa.com"
              className="font-geist-mono text-lg inline-block w-fit pb-[2px] border-b border-transparent hover:border-emerald-green hover:hover:text-emerald-green transition-all duration-300"
            >
              hello@filippocappa.com
            </a>
            <a
              href="https://www.linkedin.com/in/filippo-cappa"
              target="_blank"
              rel="noopener noreferrer"
              className="font-geist-mono text-lg inline-block w-fit pb-[2px] border-b border-transparent hover:border-emerald-green hover:hover:text-emerald-green transition-all duration-300"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/filippocappa"
              target="_blank"
              rel="noopener noreferrer"
              className="font-geist-mono text-lg inline-block w-fit pb-[2px] border-b border-transparent hover:border-emerald-green hover:hover:text-emerald-green transition-all duration-300"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="flex justify-between items-center px-page py-6 pb-12 bg-cream text-off-black">
        <span className="font-geist-mono text-mono-sm opacity-50">© {new Date().getFullYear()} Filippo Cappa</span>
        <span className="font-geist-mono text-mono-sm opacity-50">Built with discipline.</span>
      </footer>
    </main>
  )
}

