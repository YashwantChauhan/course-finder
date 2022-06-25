import { useMutation, gql } from '@apollo/client'
import Theme from './../Theme/Theme'
import Button from './../Button/Button'
import { TextField, Stack, Box, Link, Alert, IconButton, Collapse } from '@mui/material'
import prop from './props'
import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

let username = "";
let password = "";

const query = gql`
 mutation($credentials: auth!){
    login(credentials: $credentials) {
        status
        error
        token
        data {
        id
        username
        email
        }
    }
 }   
 `;

function Login() {

    let [mutationFunction, { loading, error, data }] = useMutation(query, {
        variables: {
            credentials: {
                username,
                password
            }
        }
    })

    let navigate = useNavigate()
    const [check, setCheck] = useState(false)
    const [allowed, setAllowed] = useState(true)
    const [usernameState, setUsernameState] = useState("ok")
    const [passwordState, setPasswordState] = useState("ok")
    const [usernameTouched, setUsernameTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)

    if (data && data.login.error && !check && allowed) {
        setCheck(true)
    }

    const routeChange = () => {
        localStorage.setItem("token",data.login.token)
        let path = "/dashboard"
        navigate(path);
    }

    if (data && !data.login.error) {
        routeChange()
    }


    return (
        <div>
            <Theme />
            <Stack sx={{
                width: '50%',
                margin: 'auto auto auto auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '200px'
            }}
                spacing={2}>
                <Box sx={prop.span_lg}>Login</Box>
                <Box sx={prop.span_sm}>If you don't have an account <Link sx={prop.linkProp} href="/signup"> SignUp </Link></Box>
                <TextField required={true} defaultValue={username} id="username" label="Username" variant="outlined" color="warning" sx={prop.textProps} onChange={
                    (event) => {
                        username = event.target.value
                    }
                }
                {...(usernameTouched && (usernameState !== "error" ? {} : { error: true, helperText: "This field is required" }) )}
                onFocus={()=>{
                    setUsernameTouched(false)
                }}
                />
                <TextField required={true} defaultValue={password} id="password" label="Password" variant="outlined" color="warning" type="password" sx={prop.textProps} onChange={
                    (event) => {
                        password = event.target.value
                    }
                }
                {...(passwordTouched && (passwordState !== "error" ? {} : { error: true, helperText: "This field is required" }) )}
                onFocus={()=>{
                    setPasswordTouched(false)
                }}
                />
                <Collapse in={check}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={
                                    () => {
                                        setCheck(false)
                                        setAllowed(false)
                                    }
                                }
                            >
                                X
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    > {data && data.login.error} </Alert>
                </Collapse>
                <Button disabled={(loading ? true : false)} width="300px" fontSize="0.9em" {...(loading ? { info: 'Signing in...' } : { info: "Login" })} type="Login" onclick={() => {
                    if( username.length === 0 || password.length === 0){
                        if( username.length === 0 ){
                            setUsernameState("error")
                            setUsernameTouched(true)
                        }
                        if( password.length === 0 ){
                            setPasswordState("error")
                            setPasswordTouched(true)
                        }
                    }
                    else if (!loading) {
                        mutationFunction({
                            variables: {
                                credentials: {
                                    username,
                                    password
                                }
                            }
                        })
                        setAllowed(true)
                        setCheck(false)
                    }
                }} marginTop="5em" />
            </Stack>
        </div>
    )
}

export default Login;