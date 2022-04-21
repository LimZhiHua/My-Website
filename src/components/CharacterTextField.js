import React, {useState, useEffect, useRef} from 'react';
import { TextField} from '@material-ui/core' ;
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

function CharacterTextField(props) {

    const mounted = useRef();

    const [inputVal, setInputVal] = useState(null)
    const [disabled, setDisabled] = useState(props.disabled)


    const useStyles = makeStyles((theme) => ({
        default: {
            textAlign: 'center' 
        },
        inputWhite: {
            background: '#FFFFFF',
            justifyContent: "center"
          },
        inputGreen: {
          background: '#7cb342',
          justifyContent: "center"
        },
        inputGrey: {
            background: '#808080',
            justifyContent: "center"
        },
        inputYellow: {
            background: '#FFFF00',
            justifyContent: "center"
        },
        uppercase: {
            textTransform: "uppercase"
        },
        normalBorder:{
           border: "1px solid black"
        }
      }));

    const classes = useStyles();


    const maxLength = 1;
    const answer = (props.answer).toUpperCase();
    const index = props.index;
    const submitted = props.submitted;

    // G for green, Y for Yellow, W for grey (cause G is taken)
    const setBackground = () => {
        if (!submitted){
            return classes.in
        }else if(answer[index] === inputVal){
            return classes.inputGreen
        }else if(answer.includes(inputVal)){
            return classes.inputYellow
        }else{
            return classes.inputGrey
        }
    }

    const handleInputChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setInputVal((e.target.value).toUpperCase())
        }
        
        // this is just to focus the next tab.
        if (e.target.value.length === maxLength) {
            const form = e.target.form;
            const index = [...form].indexOf(e.target);
            form.elements[index + 1].focus();
            e.preventDefault();
          }
        
    }

    // onChange doesn't trigger if it is blank and you press backspace
    const handleBackspace = (e)=> {
        if (e.target.value.length <= 0 && index > 0 && e.keyCode === 8) {
            const form = e.target.form;
            const index = [...form].indexOf(e.target);
            form.elements[index - 1].focus();
            e.preventDefault();
        }
    }


    // this is to focus the 1st input box when its enabled
    const inputFocus = (input) => {
        if(index === 0 && inputVal === null){
            return (input && input.focus())
        }else{
            return null
        }
    }

    useEffect(() => {
        setDisabled(props.disabled);
      },[props.disabled]);

    return(
        <>
            <TextField className="inputBox"
                id = {"field" + props.value}
                disabled={disabled} 
                // defaultValue={props.index} 
                inputProps={{ className:clsx(classes.default, classes.uppercase, classes.normalBorder, setBackground()) , maxLength: maxLength }}
                onChange={handleInputChange}
                onKeyDown={handleBackspace}
                // inputRef={input => input && input.focus() && index === 0}
                inputRef={inputFocus}
            />
        </>
    )

}

export default CharacterTextField