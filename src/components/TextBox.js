import React from 'react';
import "../App.css"
import { TextField } from '@material-ui/core';
import "./TextBox.css"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    textBox:{
        width:"100%"
    }
  }));
function Textbox(props) {
    const styles = useStyles();

    return(
        <span>
            <h1 className="header">{props.title}</h1>
            <br></br>
            <TextField onChange={props.onChange} value={props.value} multiline maxRows={props.maxRows} minRows={props.minRows || 0} className={styles.textBox}  label={props.label} variant="outlined" />
        </span>
    )

}

export default Textbox