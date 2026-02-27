const client_id = process.env.STRAVA_CLIENT_ID
const client_secret = process.env.STRAVA_CLIENT_SECRET
const refresh_token = process.env.STRAVA_REFRESH_TOKEN

const token_endpoint = 'https://www.strava.com/oauth/token'
const base_endpoint = 'https://www.strava.com/api/v3'

const getAccessToken = async () => {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Missing Strava environment variables')
  }

  const response = await fetch(token_endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: client_id,
      client_secret: client_secret,
      refresh_token: refresh_token,
      grant_type: 'refresh_token',
    }),
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Strava Token Refresh Error:', response.status, errorBody)
    throw new Error(`REFRESH_ERROR_${response.status}`)
  }

  return response.json()
}

export const getAthlete = async () => {
  const { access_token } = await getAccessToken()

  const response = await fetch(`${base_endpoint}/athlete`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Strava Athlete Fetch Error:', response.status, errorBody)
    throw new Error(`FETCH_ATHLETE_ERROR_${response.status}`)
  }

  return response.json()
}

export const getActivities = async (days: number = 21) => {
  const { access_token } = await getAccessToken()
  const after = Math.floor(Date.now() / 1000) - (days * 24 * 60 * 60)

  const response = await fetch(`${base_endpoint}/athlete/activities?after=${after}&per_page=100`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Strava Activities Fetch Error:', response.status, errorBody)
    throw new Error(`FETCH_ACTIVITIES_ERROR_${response.status}`)
  }

  return response.json()
}

export const getAthleteStats = async (athleteId: string) => {
  const { access_token } = await getAccessToken()

  const response = await fetch(`${base_endpoint}/athletes/${athleteId}/stats`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })

  if (!response.ok) {
    const errorBody = await response.text()
    console.error('Strava Stats Fetch Error:', response.status, errorBody)
    throw new Error(`Failed to fetch Strava athlete stats: ${response.status}`)
  }

  return response.json()
}
