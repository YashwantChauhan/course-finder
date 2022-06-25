import { Box, Collapse } from '@mui/material';
import { useState } from 'react'
import Button from './../Button/Button';
import prop from './props'
import './Navbar.css'

function Navbar() {

    const [navbar, setNavbar] = useState(() => false)


    return (
        <div style={{ overflowY: 'hidden', position: 'fixed', display: 'block', zIndex: 2 }} >
        <style jsx="true" global="true">{`
            body {
                margin: 0px;
                padding: 0px;
            }
        `}</style>
        <Collapse in={navbar} collapsedSize="3.8em" >
            <Box sx={prop.Box} />
        </Collapse>
        <div className='divButt' onClick={() => setNavbar(!navbar)} />
        </div>
    )
}

export default Navbar;