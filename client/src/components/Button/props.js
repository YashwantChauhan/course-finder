exports.ButtonProp = {
            maxWidth: '100%', 
            height: '3.0rem',  
            maxHeight: '42px',  
            color: 'black   ',
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            animationName: 'buttonIn',
            animationDuration: '3s',
            animationFillMode: 'forwards',
            borderRadius: '5px',    
            fontFamily: "'Be Vietnam Pro', sans-serif",
            '&:hover': {
                'cursor': 'pointer',
                'boxShadow': '0px 0px 10px white',
                backgroundColor: 'white',
                transition: 'all 0.2s',
                '&::after': {
                    visibility: 'visible',
                    animationName: 'button',
                    animationDuration: '1s',
                    animationFillMode: 'forwards'
                },
        
            },
            '&::after': {
                content: '""',
                height: 'inherit',
                width: '400px',
                visibility: 'hidden',
                background: 'orange',
                position: 'absolute',
                right: '0px',
            },
            '@keyframes button': {
                '25%':{
                    width: '0px',
                    right: '0px',
                },
                '50%':{
                    width: '400px',
                    right: '0px',
                },
                '75%': {
                    width: '0px',
                    left: '0px'
                },
                '100%': {
                    width: '0px',
                    left: '0px'
                }
            },
            '@keyframes buttonIn': {
                '0%': {
                    opacity: 0
                },
                '100%':{
                    opacity: 1
                }
            },
}

exports.iconStyle = {
    margin: '0px 0px 0px 5px',
    height: '20px',
}
