import { makeStyles } from "@material-ui/core";
import React, { useRef, useEffect } from "react";

import { one, two, three, gem } from "./Icons";

const style = makeStyles((theme) => ({
    sideplate: {
        display: "flex",
        alignItems: "center",
        position: "relative",
        bottom: "5vh",
        justifyContent: "space-between",
        width: "15vh",

        [theme.breakpoints.down("xs")]: {
            display: "none",
        }
    },

    numbers: {
        display: "flex",
        flexDirection: "column",
        "& > img": {
            width: "11vh",
            margin: "2.75vh 0"
        }
    },

    gems: {
        display: "flex",
        flexDirection: "column",
        
        "& > img": {
            width: "2vh",
            margin: "5vh 0",
            position: "relative",
            bottom: "0.25vh",
            filter: "saturate(0.5)"
        }
    },

    reverse:  {
        flexDirection: "row-reverse"
    },

    one: {
        "& :nth-child(3)" : {
            filter: "saturate(3)"
        }
    },

    two: {
        "& :nth-child(2), :nth-child(3), :nth-child(4)" : {
            filter: "saturate(4)"
        }
    },

    three: {
        "& img": {
            filter: "saturate(5)"
        }
    }
}));


export default function Sideplate({reversed, bet}) {

    const cls = style();

    const gems = useRef(null);

    // change lights depending on bet
    useEffect(() => {

        switch (bet) {
            case "1":
                gems.current.className += (" " + cls.one);
                break;
            case "2": 
                gems.current.className += (" " + cls.two);
                break;
            case "3": 
                gems.current.className += (" " + cls.three);
                break;
        }
    }, [bet]);


    return (
        <div className={cls.sideplate + (reversed ? ` ${cls.reverse}` : "") } >

            <div className={cls.numbers} >
                <img src={three} alt="" />
                <img src={two} alt="" />
                <img src={one} alt="" />
                <img src={two} alt="" />
                <img src={three} alt="" />
            </div>

            <div ref={gems} className={cls.gems} >
                {Array(5).fill().map((_, i) => 
                    <img key={'gem-' + i} src={gem} alt="" />                    
                )}
            </div>

        </div>
    );
}