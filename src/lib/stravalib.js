import axios from 'axios'
import stravaConfig from './stravaconfig.json'
const accessToken = stravaConfig.accessToken

const accessParams = {
  params: {
    access_token: accessToken
  }
}

let authenticatedAthlete

export async function getAuthenticatedAthlete () {
  try {
    if (!authenticatedAthlete) {
      let response = await axios.get('https://www.strava.com/api/v3/athlete', accessParams)
      authenticatedAthlete = response.data
    }
    return Promise.resolve(authenticatedAthlete)
  } catch (error) {
    console.error(error)
    throw error
  }
}

let athleteCache = {}

export async function getAthlete (id) {
  try {
    if (!athleteCache[id]) {
      let response = await axios.get(`https://www.strava.com/api/v3/athletes/${id}`, accessParams)
      athleteCache[id] = response.data
    }
    return Promise.resolve(athleteCache[id])
  } catch (error) {
    console.error(error)
    throw error
  }
}

let activityCache = {}

export async function getActivity (id) {
  try {
    if (!activityCache[id]) {
      let response = await axios.get(`https://www.strava.com/api/v3/activities/${id}`, accessParams)
      activityCache[id] = response.data
    }
    return Promise.resolve(activityCache[id])
  } catch (error) {
    console.error(error)
    throw error
  }
}

let streamCache = {}

export async function getStream (id) {
  try {
    if (!streamCache[id]) {
      let response = await axios.get(`https://www.strava.com/api/v3/activities/${id}/streams/time,latlng,distance,altitude,velocity_smooth,heartrate,cadence,moving,grade_smooth`, accessParams)
      streamCache[id] = response.data
    }
    return Promise.resolve(streamCache[id])
  } catch (error) {
    console.error(error)
    throw error
  }
}

let athleteActivitySummaryCache = {}

const athleteActivitySummaryParams = {
  params: {
    access_token: accessToken,
    page: 1,
    per_page: 50
  }
}

export async function getAthleteActivitySummary (athleteId) {
  try {
    if (!athleteActivitySummaryCache[athleteId]) {
      let response = await axios.get('https://www.strava.com/api/v3/athlete/activities', athleteActivitySummaryParams)
      athleteActivitySummaryCache[athleteId] = response.data
    }
    return Promise.resolve(athleteActivitySummaryCache[athleteId])
  } catch (error) {
    console.error(error)
    throw error
  }
}

let gearCache = {}

export function getGear (id) {
  if (!gearCache[id]) {
    let promise = axios.get(`https://www.strava.com/api/v3/gear/${id}`, accessParams)
      .then(response => { return Promise.resolve(response.data) })
      .catch(error => {
        console.log(error)
        return Promise.reject(error)
      })
    gearCache[id] = promise
  }
  return gearCache[id]
}
