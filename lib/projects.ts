export interface Project {
  slug: string
  title: string
  theme: 'light' | 'dark'
  abstract: string
  role: string
  timeline: string
  techStack: string[]
  repoLink?: string
  stats: Array<{
    label: string
    value: string
  }>
  content: {
    problemStatement: string
    methodology: string[]
    outcomes: string[]
  }
}

export const projects: Project[] = [
  {
    slug: 'running-club',
    title: 'THE RUNNING CLUB',
    theme: 'light',
    abstract: 'Founded and scaled a university running community from zero to weekly sessions, race logistics, and brand partnerships.',
    role: 'Founder & Logistics Lead',
    timeline: 'Sept 2023 — Present',
    techStack: ['Community Building', 'Event Management', 'Brand Partnerships', 'Operations'],
    repoLink: undefined,
    stats: [
      { label: 'Members', value: '120+' },
      { label: 'Weekly Sessions', value: '3' },
      { label: 'Events Organized', value: '15+' },
      { label: 'Retention Rate', value: '85%' },
    ],
    content: {
      problemStatement: 'University students lacked a structured, inclusive running community that balanced competitive training with social connection. Existing clubs were either too elite-focused or too casual, missing the "serious fun" middle ground.',
      methodology: [
        'Launched with a simple Instagram poll to gauge interest — 40 students responded in 48 hours.',
        'Established a consistent weekly schedule: Tuesday speed work, Thursday long runs, Saturday recovery runs.',
        'Built partnerships with local running brands (Nike, On Running) for gear discounts and event sponsorships.',
        'Implemented a tiered training structure: beginners, intermediate, and advanced groups running simultaneously but at different paces.',
        'Created a Strava club to track progress and foster friendly competition.',
        'Organized participation in local 5K/10K races as a group, handling logistics and transportation.',
      ],
      outcomes: [
        'Grew from 8 founding members to 120+ active runners within one academic year.',
        '85% retention rate across terms — members kept coming back.',
        'Secured £2,500 in brand sponsorships for race entries and team gear.',
        'Ran 15+ organized events including campus fun runs, charity races, and social meetups.',
        'Became the largest student-led running community at the university.',
        'Members reported improved fitness, mental health, and social networks.',
      ],
    },
  },
  {
    slug: 'financial-modelling',
    title: 'FINANCIAL MODELLING',
    theme: 'dark',
    abstract: 'Built quantitative models for portfolio optimisation, risk analysis, and time-series forecasting using Python and R.',
    role: 'Quantitative Analyst',
    timeline: 'Jan 2024 — Present',
    techStack: ['Python', 'R', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    repoLink: 'https://github.com/filippocappa/financial-models',
    stats: [
      { label: 'Models Built', value: '12+' },
      { label: 'Sharpe Ratio', value: '1.85' },
      { label: 'Accuracy (ARIMA)', value: '92%' },
      { label: 'Risk Reduction', value: '18%' },
    ],
    content: {
      problemStatement: 'Traditional investment strategies often fail to account for dynamic market conditions and correlation shifts. Manual portfolio rebalancing is inefficient and prone to emotional bias. There was a need for data-driven, systematic approaches to portfolio construction and risk management.',
      methodology: [
        'Implemented Modern Portfolio Theory (MPT) to construct efficient frontiers using historical return data from Yahoo Finance API.',
        'Built a Monte Carlo simulation engine to model 10,000+ portfolio weight combinations and identify optimal risk-return profiles.',
        'Developed ARIMA and GARCH models for time-series forecasting of asset prices and volatility.',
        'Created a risk management dashboard using Python (Pandas, Matplotlib) to visualize Value at Risk (VaR) and Conditional VaR.',
        'Backtested strategies over 5-year periods, accounting for transaction costs and slippage.',
        'Automated portfolio rebalancing logic based on threshold triggers (e.g., weight drift > 5%).',
        'Integrated real-time data feeds to monitor portfolio performance and generate alerts.',
      ],
      outcomes: [
        'Achieved a Sharpe Ratio of 1.85 on a diversified equity portfolio, outperforming the S&P 500 benchmark by 12% over the test period.',
        'Reduced portfolio volatility by 18% through systematic diversification and correlation analysis.',
        'Time-series models achieved 92% accuracy in short-term price movement predictions.',
        'Built a reusable Python framework for portfolio analysis, now used by peers in finance coursework.',
        'Presented findings in a university seminar on "Quantitative Methods in Asset Management."',
        'Developed strong proficiency in financial engineering and statistical modeling.',
      ],
    },
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
