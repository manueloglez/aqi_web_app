const TOKEN = 'bd1c3e4e5ccf7336fee6168eaadbd6808b782a73'

export const WAQI = {
  geolocalized(lat, lng) {
    return fetch(`https://api.waqi.info/feed/geo:${lat};${lng}/?token=${TOKEN}`)
    .then(res => res.json())
  }
}