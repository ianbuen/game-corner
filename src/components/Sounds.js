import ball from "../sounds/ball.mp3";
import coin from "../sounds/coin.mp3";
import seven from "../sounds/seven.mp3";
import gameCorner from "../sounds/music.mp3";

import play from "../sounds/start.mp3";
import stop from "../sounds/stop.mp3";
import deny from "../sounds/deny.mp3";
import gameover from "../sounds/gameover.mp3";


const music = (new Audio(gameCorner));
music.volume = 0.10;
music.loop = true;

export { ball, coin, seven, music, play, stop, deny, gameover }; 

export default function sound(audio) {
    const sfx = (new Audio(audio))
    sfx.volume = audio === coin ? 0.1 : 0.25;
    
    return sfx.play();
}