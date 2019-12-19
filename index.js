require('dotenv').config()
const fetch = require('node-fetch')
const Telegram = require('node-telegram-bot-api')
const bot = new Telegram(process.env.TELEGRAM_TOKEN)

const weatherToken = process.env.WEATHER_API_TOKEN

const weatherURL = new URL('https://api.openweathermap.org/data/2.5/weather')
weatherURL.searchParams.set('zip', '29130,es')
weatherURL.searchParams.set('APPID', weatherToken)
weatherURL.searchParams.set('units', 'metric')

const getWeatherData = async () => {
  const resp = await fetch(weatherURL.toString())
  const body = await resp.json()
  return body
}

const generateWeatherMessage = weatherData =>
  `La predicción para mañana en Alhaurín de la Torre. Tiempo: ${weatherData.list[0].weather[0].description}, con temperaturas de: ${weatherData.list[0].main[0].temp_min}/${weatherData.list[0].main[0].temp_max}.`

const main = async () => {
  const weatherData = await getWeatherData()
  const weatherString = generateWeatherMessage(weatherData)
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString)
}

main()
