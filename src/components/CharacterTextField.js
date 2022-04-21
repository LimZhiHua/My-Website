import React, {useState, useEffect, useRef} from 'react';
import { TextField} from '@material-ui/core' ;
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx';

function CharacterTextField(props) {

    const mounted = useRef();

    const [inputVal, setInputVal] = useState(null)
    const [disabled, setDisabled] = useState(props.disabled)

    const useStyles = makeStyles((theme) => ({
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
        }
      }));

    const classes = useStyles();


    const maxLength = 1;
    const answer = (props.answer).toUpperCase();
    const index = props.index;
    const submitted = props.submitted;

    // G for green, Y for Yellow, W for grey (cause G is taken)
    const setBackground = () => {
        //console.log("textfiledref is", inputVal())
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


    // if(index === 0){
    //     const form = e.target.form;
    //     form.elements[index].focus();
    // }
    // useEffect(() => {
    //     if(elementRef && elementRef.current){
    //         console.log("this is being run")
    //         if(index === 0){
    //             elementRef.current.focus();
    //         }
    //     }
    //   }, [props.disabled, index]);


    useEffect(() => {
        setDisabled(props.disabled)
        console.log("setting disabled???", props.disabled)
     },[props.disabled]);

    //  useEffect(() => {
    //     console.log("hello there", index)
    //     console.log("mounted cur is", mounted.current)
    // },[disabled, index]);

    useEffect(() => {
        console.log("mounted is...", mounted)
        console.log("mounted cur is", mounted.current)
    },[mounted]);


    const inputFocus = (input) => {
        if(index === 0 && inputVal === null){
            console.log("inputval is",inputVal)
            return (input && input.focus())
        }else{
            return null
        }

    }

    return(
        <>
            <TextField class="inputBox"
                disabled={disabled} 
                // defaultValue={props.index} 
                inputProps={{ className:clsx(setBackground(), classes.uppercase) , maxLength: maxLength }}
                onChange={handleInputChange}
                // inputRef={input => input && input.focus() && index === 0}
                inputRef={inputFocus}
            />
        </>
    )

}

export default CharacterTextField