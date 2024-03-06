
import { useState } from "react"
import { Box, Button, Dialog, DialogTitle, TextField, Typography } from "@mui/material"

import { useWeatherDispatch, useWeatherSelector } from '../state/hooks'
import { assignAPIKey } from "../state/actions"

/*
        <Box sx={{
            mt: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
        }}>
            <Typography variant="h3">
                Enter your OpenWeatherMap API key here
            </Typography>
            <TextField
                label="API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
            />
            <Button
                variant="contained"
                onClick={() => console.log(apiKey)}
                disabled={!apiKey}
            >
                Save and load app
            </Button>
            <Typography variant='body1'>
                {"There's no error checking in the code for the API key, please validate it ahead of time!"}
            </Typography>
        </Box>
*/
const SimpleDialog = ({
    open,
}: {
    open: boolean
}) => {

    const dispatch = useWeatherDispatch()
    const [apiKey, setApiKey] = useState('')

    return (
        <Dialog open={open}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                margin: 8,
            }}>
                <DialogTitle>
                    Enter your OpenWeatherMap API key here
                </DialogTitle>
                <TextField
                    label="API Key"
                    sx={{
                        width: '400px',
                    }}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={() => dispatch(assignAPIKey(apiKey))}
                    disabled={!apiKey}
                >
                    Save and load app
                </Button>
                <Typography variant='body1'>
                    {"There's no error checking in the code for the API key, please validate it ahead of time!"}
                </Typography>
            </Box>
        </Dialog>
    )
}

const EnterAPIKey = () => {

    const apiKeys = useWeatherSelector((state) => state.keys)

    return (
        <SimpleDialog open={!apiKeys} />
    )
}

export default EnterAPIKey