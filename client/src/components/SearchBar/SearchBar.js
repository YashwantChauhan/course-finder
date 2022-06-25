import { TextField } from '@mui/material'
import prop from './props'
import './SearchBar.css'

function SearchBar(props) {

    async function handleChange(event){
        await props.onChange(event);
    }

    return (
        <TextField
            id="filled-hidden-label-normal"
            placeholder="Search for Courses"
            variant="filled"
            sx={prop.textField}
            onChange={ handleChange }
        />
    );
}

export default SearchBar;