import { Component } from 'react';
import { Box, Link } from '@mui/material';
import props from './Home-props';
import './Home.css';
import Theme from '../Theme/Theme'
import Button from './../Button/Button'

class Home extends Component {
    render() {
        return (
            <div className='main'>
                <Theme />
                <Box sx={props.title}>
                    <Box sx={props.span_lg}>Course</Box>
                    <Box sx={props.span_sm}>The only tool you need to find your favourite course</Box>
                    <Link href='/login' color='inherit' underline='none' sx={props.linkProps}> <Button width="400px" fontSize="0.16em" info="Get Started" /></Link>
                </Box>
            </div>
        );
    }
}

export default Home;