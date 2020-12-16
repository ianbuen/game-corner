import ball from "../sounds/ball.mp3";
import coin from "../sounds/coin.mp3";
import seven from "../sounds/seven.mp3";
import gameCorner from "../sounds/music.mp3";

const music = (new Audio(gameCorner));
music.volume = 0.25;
music.loop = true;

export { ball, coin, seven, music, gameCorner }; 

export default function sound(audio) {
    const sfx = (new Audio(audio))
    sfx.volume = audio === coin ? 0.15 : 0.25;
    
    return sfx.play();
}