import { Button } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import prop from './props'

function ButtonComponent(props) {
    return (
        <Button
            {...(props.href && { href: props.href }) } 
            {...(props.onclick && { onClick: () => props.onclick() })}
            sx={{
                width: props.width,
                fontSize: props.fontSize,
                marginTop: props.marginTop,
                ...prop.ButtonProp
            }}>
            {props.info}
            <ArrowForwardIosIcon sx={prop.iconStyle} /> </Button>
    )
}

export default ButtonComponent;