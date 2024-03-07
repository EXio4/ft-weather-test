import * as React from 'react'
import { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import CloudIcon from '@mui/icons-material/Cloud'
import SearchIcon from '@mui/icons-material/Search'
import { useWeatherDispatch, useWeatherSelector } from '../state/hooks'
import { Autocomplete } from '@mui/material'
import {
  addLocation,
  clearSearchResults,
  updateSearchQuery,
} from '../state/actions'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  minWidth: '20ch',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '20ch',
    '&:focus': {
      width: '40ch',
    },
  },
}))

export default function WeatherAppBar({
  drawerWidth,
}: {
  drawerWidth: number
}) {
  const searchResults = useWeatherSelector((state) => state.search.results)
  const dispatch = useWeatherDispatch()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <CloudIcon />
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ flexGrow: 1, ml: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Weather~
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Autocomplete
              disablePortal
              id='search'
              options={searchResults}
              getOptionLabel={(option) =>
                `${option.name}, ${option.state ? `${option.state}, ` : ''}${option.country}`
              }
              renderInput={(params) => {
                const { InputLabelProps, InputProps, ...rest } = params
                return (
                  <StyledInputBase
                    {...InputProps}
                    {...rest}
                    placeholder='Search…'
                  />
                )
              }}
              filterOptions={(x) => x}
              onChange={(e, newValue) => {
                if (newValue) {
                  dispatch(addLocation(newValue))
                  dispatch(clearSearchResults())
                }
              }}
              onInputChange={(e, newInputValue) => {
                if (newInputValue === '') {
                  dispatch(clearSearchResults())
                }
                if (newInputValue.length > 2) {
                  dispatch(updateSearchQuery(newInputValue))
                }
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
