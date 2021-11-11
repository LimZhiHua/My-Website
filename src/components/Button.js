import { Button as MaterialButton,  Box} from '@material-ui/core' ;
import React from 'react';

function Button(props) {

    return(
        <Box m = {2}>
            <MaterialButton onClick={props.onClick} variant="contained">{props.label}</MaterialButton>
        </Box>
    )

}

export default Button