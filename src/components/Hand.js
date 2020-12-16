import { makeStyles } from "@material-ui/core";
import React from "react";

import {hand} from "./Icons";

const style = makeStyles({ 
    hand: {
        width: "6vh",
        position: "absolute",
        top: "-2.5vh",
        left: "-0.5vh",
        animation: "float 0.7s ease alternate infinite",
    },
});

export default function Hand({show}) {

    const cls = style();

    return (
        <img src={hand} alt="" className={cls.hand + `${show ? " hide" : " show" }`} />
    );
}