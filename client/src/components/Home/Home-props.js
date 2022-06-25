exports.title = {
    width: '50%',
    fontSize: '13vh',
    margin: '2em auto auto auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

exports.span_lg = {
    display: 'block',
    color: 'white',
    textAlign: 'center',
    fontSize: '1em',
    paddingRight: '2.7em',
    fontFamily: "'Dancing Script', cursive",
    '@keyframes example': {
        '0%': {
            opacity: '0',
            paddingRight: '4em'
        },
        '100%': {
            opacity: '1',
            paddingRight: '2.7em'
        }
    },
    '@keyframes text-change': {
        '0%': {
            content: '" Finder"',
            color: 'orange',
            fontSize: '1em',
        },
        '25%': {
            content: '" Coursera"',
            color: 'orange',
            fontSize: '.7em',
            marginTop: '.4em'
        },
        '50%': {
            content: '" Udemy"',
            color: 'orange',
            fontSize: '.7em',
            marginTop: '.4em',
        },
        '75%': {
            content: '" eDX"',
            color: 'orange',
            fontSize: '.7em',
            marginTop: '.4em',
        },
        '100%': {
            content: '" Finder"',
            color: 'orange',
            fontSize: '1em',
        }
    },
    animationName: 'example',
    animationDuration: '1.5s', 
    '&::after': {

        content: '" Finder"',
        marginLeft: '.22em',
        marginTop: '.02em',
        fontFamily: "'Dancing Script', cursive",
        fontSize: '1em',
        'position': 'absolute',
        color: 'orange',
        animationName: 'text-change',
        animationDuration: '8s',
        animationFillMode: 'forwards',
        animationTimingFunction: 'steps(1,end)',
        animationDelay: '1s',
    }
}

exports.span_sm = {
    width: 'auto',
    display: 'block',
    textAlign: 'center',
    color: 'white',
    fontSize: '.16em',
    fontFamily: "'Sansita Swashed', cursive",
    '@keyframes example1': {
        '0%': {
            opacity: '0',
            paddingLeft: '100px'
        },
        '100%': {
            opacity: '1',
            paddingLeft: '0px'
        }
    },
    animationName: 'example1',
    animationDuration: '1.5s',
    animationTimingFunction: 'ease-in-out' 
}

exports.linkProps = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1em'
}