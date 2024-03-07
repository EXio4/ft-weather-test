import { useState } from 'react'

import {
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import WeatherAppBar from './WeatherAppBar'

import UI from './UI'

import CloudIcon from '@mui/icons-material/Cloud'
import DeleteIcon from '@mui/icons-material/Delete'
import { WeatherItem } from '../types'
import { useWeatherDispatch, useWeatherSelector } from '../state/hooks'
import { removeLocation } from '../state/actions'

const drawerWidth = 240

const PleaseSelect = () => {
  return (
    <Box>
      <Typography variant='h3'>Please select a location</Typography>
    </Box>
  )
}

const Main = () => {
  const weatherItems = useWeatherSelector((state) => state.locations)
  const dispatch = useWeatherDispatch()
  const [currentlySelectedUid, setCurrentlySelectedUid] = useState<string>('')

  const currentlySelected: WeatherItem | undefined = weatherItems.find(
    (item) => item.uid === currentlySelectedUid,
  )

  const deleteWeather = (uid: string) => {
    dispatch(removeLocation(uid))
  }

  return (
    <Box>
      <WeatherAppBar drawerWidth={drawerWidth} />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Toolbar />
        <Divider />
        <List>
          {weatherItems.map((item, index) => (
            <ListItem
              key={item.uid}
              disablePadding
              onClick={() => setCurrentlySelectedUid(item.uid)}
              secondaryAction={
                item.type === 'search' ? (
                  <IconButton
                    edge='end'
                    aria-label='delete'
                    onClick={() => deleteWeather(item.uid)}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null
              }
            >
              <ListItemButton>
                <ListItemIcon>
                  {/* TODO: make the icon appropriate */}
                  <CloudIcon />
                </ListItemIcon>
                <ListItemText
                  primary={item.location.name}
                  secondary={item.location.country}
                />
              </ListItemButton>
            </ListItem>
          ))}
          {weatherItems.length === 0 ? (
            <ListItem>
              <ListItemText primary='No locations added' />
            </ListItem>
          ) : null}
        </List>
      </Drawer>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          ml: `${drawerWidth}px`,
          position: 'relative',
        }}
      >
        <Container maxWidth='lg'>
          {currentlySelected ? (
            <UI weather={currentlySelected} />
          ) : (
            <PleaseSelect />
          )}
        </Container>
      </Box>
    </Box>
  )
}

export default Main
