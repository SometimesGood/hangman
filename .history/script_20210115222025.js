//! MODEL
let notificationContainer = document.getElementById("notification-contianer");
let wrongLetters = document.getElementById("wrong-letters");
let secretWord = document.getElementById("word");
let hangedMan = document.getElementsByClassName("figure-part");
let popup = document.getElementById("popup-container");
let playAgain = document.getElementById("play-again");
let closeBtn = document.getElementById("close");
let categoryBtn = document.getElementById("categoryBtn");
let confirmBtn = document.getElementById("confirmBtn");
let selectCategory = document.getElementById("categorySelect");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
// will get value based on user input
let selectedOption;
let userHiddenWord;
let selectOptions = Array.from(document.getElementsByTagName("option"));
let userInput = document.getElementById("userInput");

/**
 * TODO also create a modal for the user to choose category and also let user choose word */

//TODO when man is hanged he will dingle wiggle in the air
//TODO if win he may jump and get sound effect that says "everyone know im a mudda fuckin monstah! (space video game)"

let chosenCategory;

const food = [
  "spaghetti",
  "lasagne",
  "pizza",
  "Pasta",
  "Hamburger",
  "Ice cream",
];
const superheroes = [
  "Iron man",
  "Super man",
  "starlord",
  "groot",
  "hulk",
  "doctor strange",
  "Leo tetten",
  "Quicksilver",
];

const countries = [
  "Kosova",
  "Norway",
  "Spain",
  "Uganda",
  "Wakanda for evahh!",
  "Italy",
  "Russia",
  "Luxembourg",
];

// letters for the correct word
const lettersHiddenWordArray = [];

// all letters
const lettersArray = [];

const wrongLettersArray = [];
const correctLetters = [];

// window.addEventListener("click", generateWord);

// function generateWord() {
//   let randomword =
//     chosenCategoryWords[Math.floor(Math.random() * chosenCategoryWords.length)];
//   displayHiddenWord();
//   console.log(randomword);
// }

// 1
// function mainFunction(keyboardLetter) {
//   checkIfWordHasLetter(keyboardLetter);
// }

// 2
function checkIfWordHasLetter(keyboardLetter) {
  if (lettersHiddenWordArray.includes(keyboardLetter.key)) {
    correctLetters.push(keyboardLetter.key);
    lettersArray.push(keyboardLetter.key);
    //displayCorrectLetter(keyboardLetter.key);
    displayHiddenUserWord(keyboardLetter.key);

    console.log("word has this letter");
  } else {
    console.log("word does not have letter");
    checkIfPressed(keyboardLetter);
  }
}

// 3
function checkIfPressed(keyboardLetter) {
  if (lettersArray.includes(keyboardLetter.key)) {
    alreadyPressed();
  } else {
    notPressed(keyboardLetter);
  }
}

function alreadyPressed() {
  notificationContainer.classList.add("show");

  setTimeout(() => {
    notificationContainer.classList.remove("show");
  }, 4000);
}

// 4 if not pressed then add it to wrong letters array
// and display figurepart
function notPressed(keyboardLetter) {
  wrongLettersArray.push(keyboardLetter.key);
  lettersArray.push(keyboardLetter.key);
  hangedMan[0].classList.remove("figure-part");
  displayLetter(keyboardLetter.key);
}

function pickCategory() {
  selectedOption = selectCategory.value;
}

// closes modal and confirms word. then inserts letters into array
function confirmWord() {
  selectCategory.value = modal.style.display = "none";
  if (userInput.value.length > 1) {
    userHiddenWord = userInput.value;
    [...userHiddenWord].forEach((hiddenLetter) => {
      lettersHiddenWordArray.push(hiddenLetter);
    });
    displayHiddenUserWord(userHiddenWord);
  } else {
    pickCategory();
    chosenCategory = selectedOption;
    console.log(chosenCategory);
  }
}

//! VIEW

function displayHiddenCategoryWord(array) {}

function displayHiddenUserWord() {
  secretWord.innerHTML = `
    ${userHiddenWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;
  const innerWord = secretWord.innerText.replace(/[ \n]/g, "");

  if (innerWord === userHiddenWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";

    playable = false;
  }
}

// my own attempt
// function displayHiddenUserWord(hiddenLetter) {
//   [...userHiddenWord].forEach((hiddenLetter) => {
//     secretWord.innerHTML += `<span class="letter">${
//       correctLetters.includes(hiddenLetter) ? hiddenLetter : hiddenLetter
//     }</span>`;
//     console.log(hiddenLetter);
//   });
// }

function displayLetter(letter) {
  let wrongLetter = document.createElement("p");
  wrongLetter.classList.add("wrongLetters");
  wrongLetter.innerHTML = letter;
  wrongLetters.appendChild(wrongLetter);
}

// opens modal
function openCategoryModal() {
  modal.style.display = "block";
}

// close modal
function closeModal(e) {
  // If clicking on the background of the modal not the modal itself
  if (e.target == modal || e.target == closeBtn) {
    modal.style.display = "none";
  }
}

//! CONTROLLER
// eventlistener for keypress
window.addEventListener("keypress", checkIfWordHasLetter);

// open modal to choose a new category
categoryBtn.addEventListener("click", openCategoryModal);

// Get value from select
selectCategory.addEventListener("change", pickCategory);

// for confirming category
confirmBtn.addEventListener("click", confirmWord);

// closing modal
window.addEventListener("click", closeModal);
