import { makeStyles } from "@material-ui/core"; 
import React, { useState } from "react"; 

const style = makeStyles({
    modal: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "absolute",
        left: 0,
        top: 0,
        alignItems: "center",
        background: "#000c",
        zIndex: 100,

        "& h1": {
            color: "white",
            fontFamily: "Pokemon GB",
            fontSize: "2.25vh",
            marginBottom: "3vh"
        },

        "& p": {
            color: "white",
            fontFamily: "Pokemon GB",
            fontSize: "2.25vh"
        }
    },

    info: {
        marginTop: "15vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        "& p": {
            lineHeight: "2",
            fontSize: "2vh"
        },

        "& :last-child": {
            marginTop: "5vh"
        },

        "& a": {
            color: "white"
        }
    }
});

export default function Modal({ onClick }) {

    const cls = style();

    const [open, setOpen] = useState(true);

    return (
        <div className={cls.modal} style={{ display: !open ? "none" : "flex"}} onClick={() => { setOpen(false); onClick(); }}>
            <h1>Rocket Game Corner!</h1>
            <p>Tap to play...</p>

            <div className={cls.info}>
                <p>Made by Ian Paul</p>
                <p>IG: <a href="https://instagram.com/eoncognito" target="_blank">@eoncognito</a></p>
                <p>GitHub: <a href="https://github.com/ianbuen" target="_blank">@ianbuen</a></p>
                <p>Original by Game Freak</p>
            </div>
        </div>
    );
}