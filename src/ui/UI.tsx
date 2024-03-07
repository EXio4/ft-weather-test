import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { CurrentWeatherData, WeatherItem, WeatherEntry } from '../types'

const CurrentWeather = ({ data }: { data: CurrentWeatherData }) => {
  return (
    <CardContent>
      <Typography variant='h4'>{data.temperature}°C</Typography>
      <Typography variant='h6'>
        <strong>Feels like</strong> {data.feels_like}°C
      </Typography>
      <Typography variant='h6'>
        <strong>Humidity:</strong> {data.humidity}%
      </Typography>
      <Typography variant='h6'>
        <strong>Pressure:</strong> {data.pressure}hPa
      </Typography>
    </CardContent>
  )
}

const DailyWeatherEntry = ({ entry }: { entry: WeatherEntry }) => {
  return (
    <Card>
      <CardHeader
        title={`Daily Weather for ${new Date(entry.time * 1000).toLocaleDateString()}`}
      />
      <CardContent>
        <Box sx={{ display: 'block' }}>
          <Typography variant='h6' sx={{ display: 'inline-block', mr: 2 }}>
            Temperature
          </Typography>
          <Typography
            variant='h6'
            sx={{ display: 'inline-block', mr: 2, fontWeight: 'bold' }}
          >
            {entry.temperature.day}°C
          </Typography>
          <Typography variant='h6' sx={{ display: 'inline-block' }}>
            {entry.temperature.min}°C / {entry.temperature.max}°C
          </Typography>
        </Box>
        <Typography variant='h6'>
          Feels Like: {entry.feels_like.day}°C
        </Typography>
        <Typography variant='h6'>Pressure: {entry.pressure}hPa</Typography>
        <Typography variant='h6'>Humidity: {entry.humidity}%</Typography>
      </CardContent>
    </Card>
  )
}

const DailyWeather = ({ data }: { data: WeatherEntry[] }) => {
  return (
    <Grid container spacing={2}>
      {data.map((entry, index) => (
        <Grid xs={12}>
          <DailyWeatherEntry entry={entry} key={index} />
        </Grid>
      ))}
    </Grid>
  )
}

const LocationInfo = ({ location }: { location: WeatherItem['location'] }) => {
  return (
    <Box>
      <Typography variant='h4'>{location.name}</Typography>
      <Typography variant='h6'>{location.country}</Typography>
    </Box>
  )
}

const LoadingCurrentWeather = () => {
  return (
    <CardContent>
      <Typography variant='h4'>Loading...</Typography>
    </CardContent>
  )
}

const UI = ({ weather }: { weather: WeatherItem }) => {
  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={6}>
        <LocationInfo location={weather.location} />
      </Grid>
      <Grid xs={12} md={6}>
        <Card
          variant='outlined'
          sx={{
            width: '100%',
          }}
        >
          {weather.data ? (
            <CurrentWeather data={weather.data.current} />
          ) : (
            <LoadingCurrentWeather />
          )}
        </Card>
      </Grid>
      <Grid xs={12}>
        {weather.data ? <DailyWeather data={weather.data.daily} /> : null}
      </Grid>
    </Grid>
  )
}

export default UI
