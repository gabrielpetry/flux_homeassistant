const express = require('express')
const app = express()
const port = 9898
const { changeLight, getOnLights } = require('./services/hass')


app.get('/', async (req, res) => {
  res.send({ ok: true })
})

app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded

app.post('/', async (req, res) => {
  let onLights = await getOnLights()
  let { ct: kelvin, bri: brightness_pct } = req.query
  brightness_pct = brightness_pct * 100
  onLights.map(light => {
    changeLight(light.entity_id, kelvin, brightness_pct, light.state)
  })
  res.send('POST!')
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
