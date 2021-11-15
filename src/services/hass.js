const axios = require('axios')
const dotenv = require('dotenv')

// load env variables
dotenv.config()

const { token, hassUrl } = process.env
// @ts-ignore
const api = axios.create({
  baseURL: hassUrl ?? 'http://192.168.0.11:8123/api',
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const getOnLights = async () => {
  // @ts-ignore
  let res = await api.get('/states',).catch(err => console.log('err', err.message))
  // console.log(res.data)
  if (!res) return []
  return res.data.filter(a => (a.entity_id.startsWith('light') && a.state == 'on'))
}

const generateCurve = () => {
  let curve = {}
  for (let i = 3500; i <= 6500; i++) {
    curve[i] = i + 1
  }

  return curve
}

const changeLight = async (entity_id, kelvin, brightness_pct, state) => {
  // @ts-ignore

  let res = await api.post(`/services/light/turn_${state}`, {
    entity_id,
    kelvin,
    //brightness_pct
  }).catch(err => console.log('err', err.message));
}
module.exports = { changeLight, getOnLights }