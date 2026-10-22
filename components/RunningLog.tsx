import { getActivities } from '@/lib/strava'

const RUN_TYPES = new Set(['Run', 'TrailRun', 'VirtualRun'])
const DAYS = 28

// Last four weeks of running from Strava. Renders nothing if Strava is not
// configured or the request fails, so the page never shows a broken state.
export default async function RunningLog() {
  let runs: { distance: number; moving_time: number }[]
  try {
    const activities = await getActivities(DAYS)
    runs = activities.filter((a: { type: string }) => RUN_TYPES.has(a.type))
  } catch {
    return null
  }
  if (runs.length === 0) return null

  const km = runs.reduce((acc, r) => acc + r.distance, 0) / 1000
  const seconds = runs.reduce((acc, r) => acc + r.moving_time, 0)
  const pace = seconds / km
  const paceLabel = `${Math.floor(pace / 60)}:${Math.round(pace % 60).toString().padStart(2, '0')} per km`

  const rows = [
    { label: 'Distance', value: `${Math.round(km)} km` },
    { label: 'Runs', value: `${runs.length}` },
    { label: 'Weekly average', value: `${Math.round(km / 4)} km` },
    { label: 'Average pace', value: paceLabel },
  ]

  return (
    <div className="font-sans">
      <p className="font-semibold mb-3">My last four weeks of running</p>
      <dl className="grid grid-cols-2 border-t border-rule">
        {rows.map((row) => (
          <div key={row.label} className="border-b border-rule py-3 pr-4">
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="text-2xl font-bold tabular condensed">{row.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-2 text-sm text-muted">Source: Strava, refreshed hourly.</p>
    </div>
  )
}
