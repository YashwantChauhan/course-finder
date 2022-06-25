import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Theme from './../Theme/Theme'
import Button from './../Button/Button'
import { TextField, Stack, Box, Link, Collapse, IconButton, Alert } from '@mui/material'
import { useMutation, gql } from '@apollo/client'
import prop from './props'
import './SignUp.css'

let username = "";
let password = "";
let email = "";

const query = gql`
 mutation($form: signUpForm!){
  signup(form: $form) {
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

function SignUp(props) {

    let [mutationFunction, { loading, error, data }] = useMutation(query, {
        variables: {
            form: {
                username,
                password,
                email,
            }
        }
    })

    const navigate = useNavigate()


    const [emailState, setEmailState] = useState("ok")
    const [usernameState, setUsernameState] = useState("ok")
    const [passwordState, setPasswordState] = useState("ok")
    const [emailTouched, setEmailTouched] = useState(false)
    const [usernameTouched, setUsernameTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [check, setCheck] = useState(false)
    const [allowed, setAllowed] = useState(true)


    const emailFunc = (event) => {
        email = event.target.value
        if (event.target.value === "") {
            setEmailState("ok")
        }
        else if (!event.target.value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
            setEmailState("error")
            setEmailTouched(true)
        }
        else {
            setEmailState("ok")
            setEmailTouched(false)
        }
    }

    if (data && data.signup.error && !check && allowed) {
        setCheck(true)
    }

    const onEmailFocusView = (event) => {
        if (emailState === "error" || event.target.value === "") setEmailTouched(true)
    }

    const offEmailFocusView = (event) => {
        if (emailState === "ok") setEmailTouched(false)
    }

    const routeChange = () => {
        localStorage.setItem("token", data.signup.token)
        let path = "/"
        navigate(path);
    }

    useEffect(() => {
        if (data && !data.signup.error) {
            routeChange()
        }
    })

    return (
        <div>
            <Theme />
            <Stack sx={prop.stackProp}
                spacing={2}>
                <Box sx={prop.span_lg}>SignUp</Box>
                <Box sx={prop.span_sm}>If you already have an account <Link sx={prop.linkProp} href="/login"> Login </Link></Box>
                <TextField
                    required={true}
                    {...(emailTouched ? (emailState !== "error" ? (emailState === "ok" ? { helperText: "Please enter you email" } : { error: true, helperText: "This field is required" }) : { error: true, helperText: "Please input a valid email" }) : false)}
                    id="email" label="Email"
                    variant="outlined" color="warning" sx={prop.textProps}
                    onChange={emailFunc}
                    onFocus={onEmailFocusView}
                    onBlur={offEmailFocusView}
                />
                <TextField required={true} id="username" label="Username" variant="outlined" color="warning"
                    {...(usernameTouched && (usernameState !== "error" ? {} : { error: true, helperText: "This field is required" }))}
                    onChange={(event) => {
                        username = event.target.value
                    }}
                    onFocus={() => {
                        setUsernameTouched(false)
                    }}
                    sx={prop.textProps} />
                <TextField required={true} id="password" label="Password" variant="outlined" color="warning" type="password"
                    {...(passwordTouched ? (passwordState !== "error" ? (passwordState === "ok" ? {} : { error: true, helperText: "Please enter a  password minimum 7 characters" }) : { error: true, helperText: "Password cannot be empty" }) : false)}
                    onChange={(event) => {
                        password = event.target.value
                    }}
                    onFocus={() => {
                        setPasswordTouched(false)
                    }}
                    sx={prop.textProps} />
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
                    > {data && data.signup.error} </Alert>
                </Collapse>
                <Button width="300px" disabled={(loading ? true : false)} fontSize="0.9em" {...(loading ? { info: 'Signing up...' } : { info: "Sign Up" })} marginTop="5em" onclick={() => {

                    if (username.length === 0 || password.length === 0 || password.length <= 6 || email.length === 0 || emailState === "error") {
                        if (username.length === 0) {
                            setUsernameState("error")
                            setUsernameTouched(true)
                        }
                        if (password.length === 0) {
                            setPasswordState("error")
                            setPasswordTouched(true)
                        }

                        if (password.length !== 0 && password.length <= 6) {
                            setPasswordState("invalid")
                            setPasswordTouched(true)
                        }

                        if (email.length === 0) {
                            setEmailState("Invalid")
                            setEmailTouched(true)
                        }

                        if (emailState === "error") {
                            setEmailTouched(true)
                        }
                    }
                    else if (!loading) {
                        mutationFunction({
                            variables: {
                                form: {
                                    username,
                                    password,
                                    email,
                                }
                            }
                        })
                        setAllowed(true)
                        setCheck(false)
                    }
                }} />
            </Stack>
        </div>
    )
}

export default SignUp;