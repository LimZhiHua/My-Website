import React from 'react';
import { TextField, Paper} from '@material-ui/core' ;

function CharacterTextField(props) {

    const row = props.row;

    return(
        <Paper className='TextBox'>
        <TextField disabled={props.disabled} defaultValue={props.value}/>
        </Paper>
    )

}

export default CharacterTextField