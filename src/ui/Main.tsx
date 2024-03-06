import { useState } from "react"

import { Box, Container, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import WeatherAppBar from './WeatherAppBar'

import UI from "./UI"

import CloudIcon from '@mui/icons-material/Cloud'
import { WeatherItem } from "../types"
import { useWeatherSelector } from "../state/hooks"

const drawerWidth = 240


const weatherExample: WeatherItem[] = [
    {
        type: 'my-location',
        uid: 'my-location',
        location: {
            name: 'My Location',
            latitude: 0,
            longitude: 0,
            country: 'Unknown'
        },
        data: {
            current: {
                weather_id: 100,
                temperature: 0,
                feels_like: 0,
                humidity: 0,
                pressure: 0,
                time: 0
            },
            daily: [{
                temperature: {
                    day: 0,
                    min: 0,
                    max: 0,
                    night: 0,
                    evening: 0,
                    morning: 0
                },
                feels_like: {
                    day: 0,
                    night: 0,
                    evening: 0,
                    morning: 0
                },
                pressure: 0,
                humidity: 0,
                weather_id: 0,
                time: 0
            }, {
                temperature: {
                    day: 0,
                    min: 0,
                    max: 0,
                    night: 0,
                    evening: 0,
                    morning: 0
                },
                feels_like: {
                    day: 0,
                    night: 0,
                    evening: 0,
                    morning: 0
                },
                pressure: 0,
                humidity: 0,
                weather_id: 0,
                time: 0
            }]
        }
    },
    {
        type: 'search',
        uid: 'item-1',
        location: {
            name: 'London',
            latitude: 51.5074,
            longitude: 0.1278,
            country: 'United Kingdom'
        },
        data: {
            current: {
                weather_id: 100,
                temperature: 0,
                feels_like: 0,
                humidity: 0,
                pressure: 0,
                time: 0
            },
            daily: [{
                temperature: {
                    day: 0,
                    min: 0,
                    max: 0,
                    night: 0,
                    evening: 0,
                    morning: 0
                },
                feels_like: {
                    day: 0,
                    night: 0,
                    evening: 0,
                    morning: 0
                },
                pressure: 0,
                humidity: 0,
                weather_id: 0,
                time: 0
            }, {
                temperature: {
                    day: 0,
                    min: 0,
                    max: 0,
                    night: 0,
                    evening: 0,
                    morning: 0
                },
                feels_like: {
                    day: 0,
                    night: 0,
                    evening: 0,
                    morning: 0
                },
                pressure: 0,
                humidity: 0,
                weather_id: 0,
                time: 0
            }]
        }
    }
]

const PleaseSelect = () => {
    return (
        <Box>
            <Typography
                variant='h3'>
                Please select a location
            </Typography>
        </Box>
    )
}

const Main = () => {

    const weatherItems = useWeatherSelector(state => state.locations)
    const [currentlySelectedUid, setCurrentlySelectedUid] = useState<string>('')
    
    const currentlySelected: WeatherItem | undefined = weatherItems.find(item => item.uid === currentlySelectedUid)

    return (
        <Box>
            <WeatherAppBar
                drawerWidth={drawerWidth}
            />
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
                            key={item.uid} disablePadding
                            onClick={() => setCurrentlySelectedUid(item.uid)}>
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
                            <ListItemText
                                primary='No locations added'
                            />
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
                    {currentlySelected ? <UI weather={currentlySelected} /> : <PleaseSelect />}
                </Container>
            </Box>
            
        </Box>
    )
}

export default Main
