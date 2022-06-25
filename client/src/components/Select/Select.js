import { FormControl, MenuItem, InputLabel, Select  } from '@mui/material'
import { useState } from 'react'
import prop from './props'

function SelectComponent(props) {
    
    const [value,setValue] = useState("all")

    async function handleChange(event){
        setValue(event.target.value);
        await props.onChange(event)
    };

    return (
        <FormControl variant="filled" sx={prop.FormControl}>
        <InputLabel id="demo-simple-select-filled-label" sx={prop.label}>{props.title}</InputLabel>
        <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={value}
            onChange={handleChange}
        >
            <MenuItem value="all" key="all">
                All
            </MenuItem>
            { props.values.map(val=>{
                return <MenuItem value={val} key={val}>{val}</MenuItem>    
            })}
        </Select>
    </FormControl>
    )
    
}

export default SelectComponent;