import "../css/style.css";
import { darkModeHandle } from "./utils.js";
import { startGame } from "./game.js";

darkModeHandle();

const startGameBtn = document.getElementById("startGame");

startGameBtn.addEventListener("click", startGame);
