import React, { useEffect, useState } from "react";
import _ from "lodash";
import "../styles/Slots.css";
import Reel from "./Reel";

// audio
import sound, { ball, coin, seven, music, play, stop, deny, gameover } from "./Sounds";

// images
import icons from "./Icons";

import { vileplume, credit, payout } from "./Icons"; 
import { useStateValue } from "../StateProvider";
import { makeStyles } from "@material-ui/core";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Modal from "./Modal";
import Sideplate from "./Sideplate";
import Hand from "./Hand"; 

// reel speed in milliseconds
const speed = 100;

const styles = makeStyles({
  slots: {
    "& img": { 
      animation: `linear ${speed / 1000}s infinite`
    }
  },

  post: {
    right: "0%"
  }
}); 

function Slots() {
  
  const cls = styles();
  
  const [{ reels }, dispatch] = useStateValue();
  
  const [start, setStart] = useState(false);
  const [stops, setStops] = useState(0);
  const [coins, setCoins] = useState(50);
  const [coinsWon, setCoinsWon] = useState(0);
  const [pay, setPay] = useState(false);
  const [bet, setBet] = useState(0);
  const [roll, setRoll] = useState([ false, false, false ]);

  const [dialog, setDialog] = useState("Bet how many coins?");
  
  const [time, setTime] = useState(new Date().getMilliseconds());

  // 1st Effect: creates 3 reels and makes a timer
  useEffect(() => { 

    const reelA = preRoll(_.shuffle([...icons]));
    const reelB = preRoll(_.shuffle([...icons]));
    const reelC = preRoll(_.reverse([...reelA]));

    dispatch({
      type: "SET_REELS",
      reels: [reelA, reelB, reelC]
    });

    // make a delay timer
    const timer = setInterval(() => {
      setTime(new Date().getMilliseconds()); 
    }, (speed));

    return () => clearInterval(timer);

  }, []);



  // 2nd Effect: Run code in ms based on reel speed
  useEffect(() => {

    if (reels && reels.length > 0) {

        let copy = [...reels];

        if (copy && copy.length > 0) {
            if (roll[0]) {
                copy[0].unshift(copy[0].pop()); 
            }

            if (roll[1]) {
              copy[1].unshift(copy[1].pop()); 
            }
            
            if (roll[2]) {
              copy[2].unshift(copy[2].pop()); 
            }

            !roll.includes(true) && setStart(false);
        }
    } 

    if (coinsWon >= 0 && pay) {        
        if (coinsWon < 1) {
            return reset();
        }
        
        setCoinsWon(coinsWon - 1);

        if (coins < 9999)
            setCoins(coins + 1);

        sound(coin);
    }
  
  }, [time]); 


  // 3rd Effect: Get results of each run
  useEffect(() => {

    if (stops === 3)
        checkMatch();  

  }, [stops]); 



  // randomly offsets array elements
  function preRoll(array) {

    const totalRolls = Math.floor(Math.random() * array.length); 

    for (var i = 0; i < totalRolls; i++) {
          array.unshift(array.pop());
    }

    return array;
  }


  function checkMatch() {

    // no matches
    setDialog("Aww, better luck next time!");

    // horizontal match
    for (var i = 3; i < 6;  i++) {

        if (bet < 2 && i !== 4) 
            continue; 

        if (reels[0][i] === reels[1][i] && reels[0][i] === reels[2][i]) {
            const dialog = (<><img src={reels[0][i].url} alt="" /> lined up! Won {setPayout(reels[0][i].name)} coins!</>);
            return setDialog(dialog); 
        }
    }

    // diagonal down match
    if (reels[0][3] === reels[1][4] && reels[0][3] === reels[2][5]) { 
        const dialog = (<><img src={reels[0][3].url} alt="" /> lined up! Won {setPayout(reels[0][3].name)} coins!</>);
        return setDialog(dialog);
    }
    
    // diagonal up match
    if (reels[0][5] === reels[1][4] && reels[0][5] === reels[2][3]) {
        const dialog = (<><img src={reels[0][5].url} alt="" /> lined up! Won {setPayout(reels[0][5].name)} coins!</>);
        return setDialog(dialog);
    }

  }

  function setPayout(icon) {
    let prize = 0;

    switch (icon) {
      case "berry": prize = 8; break;
      case "ball": 
          prize = 100;
          sound(ball);
          break;
      case "seven": 
          prize = 300; 
          sound(seven);
          break;
      default: prize = 15; break;
    }

    setCoinsWon(prize);
    return prize;
  }
  
  function playBet(event) {
    const {value} = event.target;

    // if enough coins
    if (coins >= value) {
        setRoll([true, true, true]);
        setStart(true);
        sound(play);
        setDialog("Here goes... Good luck!");
        setStops(0);
        setBet(value);
        setCoins(coins - value);
    } else {
        setDialog("Not enough coins!");
        sound(deny);
        setTimeout(() => { setDialog("Bet how many coins?") }, 2000);
    }
    
  } 

  function toggleReel(reel) {
    if (!start || !roll[reel])
        return false; 

    setRoll(prev => { prev[reel] = false; return prev; });
    setStops(stops + 1);
    sound(stop);
  }

  function rollStyle(reelNo) {
    return (roll[reelNo] ? { animationName : "roll" } : {});
  }

  function reset() {

    if (stops > 2) {
    
        if (coinsWon < 1) {
            setPay(false);
            setStops(0);
            setBet(0); 
            setDialog("Bet how many coins?");

            if (coins < 1) {
                setDialog("GAME OVER! Out of coins!");
                setStops(3);
                music.volume = 0.1;
                sound(gameover);
                setTimeout(() => { music.volume = 0.25; }, 2000);
            }
        }

        // option to skip payouts
        else if (pay) {
            setCoins(coins + coinsWon);
            setCoinsWon(0);
            sound(coin);
        }

        else
            setPay(true);
    }
  }

  return (
    <>
      <Sideplate bet={bet} />

      <div className="slots__container">

      <div className="lines" />

      <div className="coin__count">
        <div>
          <img src={credit} alt="credit" />
          <p>{_.padStart(coins, 4, "0")}</p>
        </div>
        
        <div>
          <img src={payout} alt="payout" />
          <p>{_.padStart(coinsWon, 4, "0")}</p>
        </div>
      </div>

      <div className="vileplumes">
        <img src={vileplume} alt="" />
        <img src={vileplume} alt="" />
        <img src={vileplume} alt="" />
      </div>

      <div className={"slots " + cls.slots}>
        <div className="divider" />
        <Reel data={reels[0]} anim={rollStyle(0)} />
        <div className="divider" />
        <Reel data={reels[1]} anim={rollStyle(1)} />
        <div className="divider" />
        <Reel data={reels[2]} anim={rollStyle(2)} />
        <div className="divider" />
      </div> 

      <div className="slots__boxes">
        <div className="button__panel" >
          <div onClick={() => {toggleReel(0)}} ><Hand show={stops} /></div>
          <div onClick={() => {toggleReel(1)}} ><Hand show={stops} /></div>
          <div onClick={() => {toggleReel(2)}} ><Hand show={stops} /></div>
        </div>
      </div>

      <div className={"dialog__box" + `${stops > 2 ? " result" : ""}`} onClick={reset}>
        
        <div className="dialog__text">
          <p>{dialog}</p>
          
          <div className={"bet" + `${stops > 2 ? " hide" : ""}` + `${start || coins < 1 ? " hide" : "" }`}>
            <div className="bet__option" >
              <button onClick={playBet} value="3">x3</button>
              <button onClick={playBet} value="2">x2</button>
              <button onClick={playBet} value="1">x1</button>
            </div>
          </div>

        </div>

        <ArrowDropDownIcon className={`dialog__prompt ${stops > 2 ? " show" : ""}`} />

      </div> 

      <Modal onClick={() => { music.play() }} />
      </div>

      <Sideplate bet={bet} reversed />
    </>
  ); 
}

export default Slots;
