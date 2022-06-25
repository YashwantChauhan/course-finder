import { Stack } from '@mui/material'


function MainFrame(props){
    return (
        <Stack sx={{
            width: '70vw',
            height: '78vh',
            bgcolor: 'white',
            borderRadius: '6px',
            overflowY: 'scroll',
            margin: props.margin,
            padding: props.padding
        }}/>
    )
}

export default MainFrame;