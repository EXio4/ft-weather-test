
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'

import theme from './theme'

import Main from './Main'
import EnterAPIKey from './EnterAPIKey'

const Root = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Main />
            <EnterAPIKey />
        </ThemeProvider>
    )
}

export default Root