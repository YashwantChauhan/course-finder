exports.textProps = {
    '& .MuiFormHelperText-root': {
        color: 'white'
    },
    '& .MuiFormLabel-root': {
        color: 'white',
        '& .MuiInputLabel-root.Mui-focused': {
                color: 'white'
        },
    },
    '& .MuiOutlinedInput-root': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "orange"
        },

        '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: "#ed6c02"
            },
        },
    },
    '& .MuiOutlinedInput-input': {
        color: 'white'
    },
    width: '80%',
}

exports.span_lg = {
    display: 'block',
    color: 'orange',
    textAlign: 'center',
    fontSize: '5em',
    paddingBottom: '.3em',
    fontFamily: "'Dancing Script', cursive",
    animationName: 'example',
    animationDuration: '1.5s', 
}

exports.span_sm = {
    width: 'auto',
    display: 'block',
    alignSelf: 'space-around',
    paddingBottom: '1em',
    color: 'white',
    fontSize: '1em',
    fontFamily: "'Sansita Swashed', cursive",
}

exports.linkProp = {
    color: 'orange',
    cursor: 'pointer'
}

exports.stackProp = {
    width: '50%',
    margin: 'auto auto auto auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '200px'
}