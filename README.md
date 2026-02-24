# Filippo Cappa — Portfolio

A high-performance, typography-centric personal portfolio and case study platform. This project showcases the intersection of economics, quantitative modelling, and community building through a minimalist, motion-driven user experience.

## 1. Project Overview
This application serves as a digital manifesto and portfolio for Filippo Cappa. It features a sophisticated "snap-scroll" layout, custom motion sequences, and detailed case studies. The design prioritizes clarity and high-signal information, utilizing a disciplined aesthetic inspired by financial terminals and editorial design.

**Key Features:**
- **Dynamic Case Studies:** Deep dives into projects with metadata, key metrics, and methodology.
- **Financial Aesthetics:** Integrated real-time market data visualizer (Stock Ticker).
- **Immersive Motion:** Smooth scrolling (Lenis), hero reveals, and scroll-triggered animations (Framer Motion).
- **Custom UI Patterns:** Bespoke cursor interactions and progress indicators.

## 2. Architecture Breakdown
The project is built using the **Next.js App Router**, leveraging modern React patterns for performance and SEO.

- **Routing:** Uses the `/app` directory for file-system based routing, including dynamic segments for project case studies (`/work/[slug]`).
- **Data Fetching Strategy:** 
  - **Server Components:** Most pages are rendered as Server Components by default for optimal performance.
  - **Static Data:** Project content is managed via a centralized TypeScript schema in `lib/projects.ts`, allowing for easy maintenance and type safety without the overhead of an external CMS.
  - **Client-Side Interactivity:** Selective use of `'use client'` directives for motion-heavy components (Lenis, Framer Motion, and the custom Cursor).

## 3. Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animation:** [Framer Motion](https://www.framer.com/motion/) & [Lenis](https://github.com/studio-freight/lenis) (Smooth Scroll)
- **Typography:** Geist Mono (Monospace), Inter Tight (Headings), and Inter (Body)
- **Linting:** ESLint

## 4. Project Structure
```text
/app
├── layout.tsx         # Root layout (Lenis provider, Cursor, Ticker)
├── page.tsx           # Home page with snap-scroll sections
├── globals.css        # Global styles and Tailwind directives
└── work
    └── [slug]         # Dynamic Case Study engine
        └── page.tsx   # Project detail template

/components
├── Cursor.tsx         # Custom interactive cursor
├── HeroReveal.tsx     # Staggered typography animations
├── ScrollReveal.tsx   # Viewport-aware content reveals
├── SmoothScroll.tsx   # Lenis initialization
└── StockTicker.tsx    # Marquee-style market data bar

/lib
├── projects.ts        # Project database and data models
└── market.json        # Mock market data for the ticker
```

## 5. Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Local Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/filippocappa/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   *Note: Currently, no external API keys are required for the static build.*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the result.

## 6. Deployment
This project is optimized for deployment on **Vercel**:

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Import the project into the Vercel Dashboard.
3. Vercel will automatically detect Next.js and configure the build settings (`npm run build`).
4. Deployment will be live on a production-grade edge network.

---
Built with discipline by Filippo Cappa.
