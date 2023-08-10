/* eslint-disable */
import { Button } from "@mui/material";
import "./appButton.css";

export const AppButton = (props) => {
    const {customClass='',customCSS={}, label, preIcon, sufixIcon, onClick=()=>{}, disabled=false, aria_label=label, tabIndex=0} = props;
    return <Button disabled={disabled} size='small' aria-label={aria_label} sx={{...customCSS, background: "#4297D3", 
        color: "white",
        border: "none",
        borderRadius: "0.3rem",
        height: "1.7rem",
        minWidth: "6rem",
        fontSize: "0.8rem",
        textTransform:'capitalize',
        cursor:"pointer",
        padding: '0 5px',
        "&:hover": {
            color: 'white',
            background: "#4297D3",},
        "&:disabled": {
            color: '#DBDBDB',
            background: '#f2f2f2'
            }
        }} onClick={onClick} 
        tabIndex={tabIndex} className={customClass + "app-button"}>
                {preIcon && <preIcon />}
                {label}
                {sufixIcon && sufixIcon}
            </Button>
}

export const AppButton2 = (props) => {
    const {customClass='',customCSS={}, label, preIcon, sufixIcon, onClick=()=>{}, disabled=false, aria_label=label, tabIndex=0} = props;
    return <Button disabled={disabled} size='small' aria-label={aria_label} sx={{...customCSS, 
        color: "white",
        border: "none",
        background: '#A80000',
        width: '110px',
height: '40px',
padding: '5px',
        borderRadius: "5px",
        height: "1.7rem",

        fontSize: "12px",
        textTransform:'capitalize',
        cursor:"pointer",
        "&:hover": {
            color: 'white',
            background: "#A80000",},
        "&:disabled": {
            color: '#DBDBDB',
            background: '#f2f2f2'
            }
        }} onClick={onClick} 
        tabIndex={tabIndex} className={customClass + "app-button"}>
                {preIcon && <preIcon />}
                {label}
                {sufixIcon && sufixIcon}
            </Button>
}

export const AppButton3 = (props) => {
    const {customClass='',customCSS={}, label, preIcon, sufixIcon, onClick=()=>{}, disabled=false, aria_label=label, tabIndex=0} = props;
    return <Button disabled={disabled} size='small' aria-label={aria_label} sx={{...customCSS, 
        color: "white",
        border: "none",
        background: '#4297D3',
        width: '110px',
height: '40px',
padding: '5px',
        borderRadius: "5px",
        height: "1.7rem",

        fontSize: "12px",
        textTransform:'capitalize',
        cursor:"pointer",
        "&:hover": {
            color: 'white',
            background: "#4297D3",},
        "&:disabled": {
            color: '#DBDBDB',
            background: '#f2f2f2'
            }
        }} onClick={onClick} 
        tabIndex={tabIndex} className={customClass + "app-button"}>
                {preIcon && <preIcon />}
                {label}
                {sufixIcon && sufixIcon}
            </Button>
}

export const AppButton4 = (props) => {
    const {customClass='',customCSS={}, label, preIcon, sufixIcon, onClick=()=>{}, disabled=false, aria_label=label, tabIndex=0} = props;
    return <Button disabled={disabled} size='small' aria-label={aria_label} sx={{...customCSS, 
        border: "none",
        width: '110px',
height: '40px',
padding: '5px',
        borderRadius: "5px",
        height: "1.7rem",

        fontSize: "12px",
        textTransform:'capitalize',
        cursor:"pointer",
        border: '1px solid #DBDBDB',
        "&:hover": {
            },
        "&:disabled": {
            color: '#DBDBDB',
            background: '#f2f2f2'
            }
        }} onClick={onClick} 
        tabIndex={tabIndex} className={customClass + "app-button"}>
                {preIcon && <preIcon />}
                {label}
                {sufixIcon && sufixIcon}
            </Button>
}


export const AppNotSelectedButton = (props) => {
    const {customClass='', label, preIcon, sufixIcon, onClick=()=>{}, disabled=false, aria_label=label, tabIndex=0} = props;
    return <Button disabled={disabled} aria-label={aria_label} sx={{background: "white",
        color: "#6D7888",
        border: "none",
        borderRadius: "0.3rem",
        height: "1.7rem",
        minWidth: "6rem",
        fontSize: "0.8rem",
        cursor:"pointer",
        textTransform:'capitalize',
        "&:hover": {
            background: "white",}
        }} onClick={onClick} 
        tabIndex={tabIndex} 
        variant="contained" className={customClass + "app-button"}>
                {preIcon && <preIcon />}
                {label}
                {sufixIcon && sufixIcon}
            </Button>
}

{/* <button 
            role="button"
            onClick={onClick}
            disabled={disabled}
            className={customClass + "app-button"}
            tabIndex={tabIndex}
            aria-label={aria_label}>
                
            </button> */}