import { WORDS, KEYBOARD_LETTERS } from "./consts.js";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");

let triesLeft;
let winCount;

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem("word");
  const wordArray = Array.from(word);
  const placeholdersHTML = wordArray.reduce((acc, curr, i) => {
    return acc + `<p id="letter_${i}" class="letter">_</p>`;
  }, "");

  return `<div id="placeholdars" class="placeholdars-wrapper">${placeholdersHTML}</div>`;
};

const createKeyBoard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyBoardHTML = KEYBOARD_LETTERS.reduce((acc, curr, i) => {
    return (
      acc +
      `<button class="btn-primary keyboard-btn" id="${curr}">${curr}</button>`
    );
  }, "");

  keyboard.innerHTML += keyBoardHTML;
  return keyboard;
};

const createHangmanImage = () => {
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("hangman-image");
  image.id = "hangman-image";
  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();

  //Буквы нет в слове
  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById("tries-left");
    triesLeft--;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.getElementById("hangman-image");
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount += 1;
        if (winCount === word.length) {
          stopGame("win");
          return
        }
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

const stopGame = (status) => {
  document.getElementById("placeholdars").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  document.getElementById('quit').remove()

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.getElementById("hangman-image").src = `images/hg-win.png`;
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header win">You won!</h2>';
      logoH1.classList.remove('logo-sm')
  } else if (status === "lose") {
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header lose">You lose!</h2>';
      logoH1.classList.remove('logo-sm')

  } else if (status === 'quit') {
    logoH1.classList.remove('logo-sm')
    document.getElementById('hangman-image').remove()
  }

  document.getElementById("game").innerHTML +=
    `<p>The word was: <span class="result-word">${word}</span></p><button id="play-agaian" class="btn-primary px-5 py-2 mt-5">Play again</button>`;

  const btn = document.getElementById("play-agaian");

  btn.onclick = startGame
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0
  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = `<p>${wordToGuess}</p>`;

  gameDiv.innerHTML = createPlaceholdersHTML();

  gameDiv.innerHTML += `<p id="tries" class="text-lg mt-4 font-medium si">Tries left: <span id="tries-left" class="font-medium text-red-400">10</span></p>`;

  const keyBoarDiv = createKeyBoard();
  keyBoarDiv.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      e.target.disabled = true;
      e.target.style.opacity = "0.5";
      checkLetter(e.target.id);
    }
  });

  const hangmanImg = createHangmanImage();

  gameDiv.prepend(hangmanImg);
  gameDiv.appendChild(keyBoarDiv);

  gameDiv.insertAdjacentHTML('beforeend', `<button id='quit' class='btn-secondary  px-2 py-1 my-5 cursor-pointer'>Quit</button>`)
  document.getElementById('quit').onclick = () => {
    const isSure = confirm('Are you sure you want to quit and lose progress')
    if (isSure) {
      stopGame('quit')
    }
  }
};
