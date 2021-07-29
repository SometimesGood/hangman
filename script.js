//! MODEL
let notificationContainer = document.getElementById("notification-contianer");
let wrongLetters = document.getElementById("wrong-letters");
let secretWord = document.getElementById("word");
let hangedMan = document.getElementsByClassName("body-part");
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
let numOfLives = 6;
let numMistakes = 0;
// will get value based on user input
let selectedOption;
let userHiddenWord;
let selectOptions = Array.from(document.getElementsByTagName("option"));
let userInput = document.getElementById("userInput");

/**

//TODO when man is hanged he will dingle wiggle in the air
//TODO if win he may jump and get sound effect that says "everyone know im a mudda fuckin monstah! (space video game)"
*/
let chosenCategory;

const food = [
  "spaghetti",
  "lasagne",
  "pizza",
  "pasta",
  "hamburger",
  "icecream",
];
const superheroes = [
  "ironman",
  "superman",
  "starlord",
  "groot",
  "hulk",
  "doctorstrange",
  "quicksilver",
];

const countries = [
  "kosovo",
  "norway",
  "spain",
  "uganda",
  "italy",
  "russia",
  "luxembourg",
];

// letters for the correct word
let lettersHiddenWordArray = [];

// all letters
let lettersArray = [];

let wrongLettersArray = [];
let correctLetters = [];

// LOGIC FOR PLAYING THE GAME

// 1
function checkIfWordHasLetter(keyboardLetter) {
  console.log("Running");
  let keyboardLetterLowerCase = keyboardLetter.key.toLowerCase();
  if (lettersHiddenWordArray.includes(keyboardLetterLowerCase)) {
    if (correctLetters.includes(keyboardLetterLowerCase)) {
      alreadyPressed();
    }
    correctLetters.push(keyboardLetterLowerCase);
    lettersArray.push(keyboardLetterLowerCase);

    // determining if it is category word or user written word
    if (userInput.value.length > 1) {
      displayHiddenUserWord();
    } else {
      displayHiddenCategoryWord(userHiddenWord);
    }
    console.log("word has this letter");
  } else {
    console.log("word does not have letter");
    checkIfPressed(keyboardLetter);
  }
}

// 2
function checkIfPressed(keyboardLetter) {
  if (
    lettersArray.includes(keyboardLetter.key) ||
    correctLetters.includes(keyboardLetter.key)
  ) {
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

// 3 if not pressed then add it to wrong letters array
// and display figurepart
function notPressed(keyboardLetter) {
  wrongLettersArray.push(keyboardLetter.key);
  lettersArray.push(keyboardLetter.key);
  hangedMan[numMistakes].classList.remove("figure-part");
  displayLetter(keyboardLetter.key);
  numMistakes++;
  if (numMistakes == numOfLives) {
    finalMessage.innerText = "Too bad, you lost 😕";
    popup.style.display = "flex";

    playable = false;
  }
}

//LOGIC FOR GAME SETUP AND INITIALIZATION

// closes modal and confirms word. then inserts letters into array
function confirmWord() {
  modal.style.display = "none";
  if (userInput.value.length > 1) {
    userHiddenWord = userInput.value;
    [...userHiddenWord].forEach((hiddenLetter) => {
      lettersHiddenWordArray.push(hiddenLetter);
    });
    displayHiddenUserWord(userHiddenWord);
  } else {
    pickCategory();
    chosenCategory = selectedOption;
    checkCategory(chosenCategory);
  }
  userInput.value = "";
  console.log(hangedMan);
}

// sets the category
function pickCategory() {
  selectedOption = selectCategory.value;
}

// checks which category is picked, so the words will come from that category
function checkCategory(pickedCategory) {
  if (pickedCategory == "food") {
    pickWordFromCategory(food);
  } else if (pickedCategory == "superheroes") {
    pickWordFromCategory(superheroes);
  } else if (pickedCategory == "countries") {
    pickWordFromCategory(countries);
  } else {
    fetchRandomWord();
  }
}

// picks a word from chosen category
function pickWordFromCategory(categoryArray) {
  let randomCategoryWord =
    categoryArray[Math.floor(Math.random() * categoryArray.length)];
  console.log(randomCategoryWord);
  [...randomCategoryWord].forEach((hiddenLetter) => {
    lettersHiddenWordArray.push(hiddenLetter);
  });
  userHiddenWord = randomCategoryWord;
  displayHiddenCategoryWord(userHiddenWord);
}

// fetches asyncronlsy a random word
function fetchRandomWord() {
  fetch("https://random-words-api.vercel.app/word")
    .then((res) => res.json())
    .then((jsonResponse) => {
      let jsonResponseWord = jsonResponse[0].word.toLowerCase();
      console.log(jsonResponse[0].word);
      [...jsonResponseWord].forEach((hiddenLetter) => {
        lettersHiddenWordArray.push(hiddenLetter);
        console.log(hiddenLetter);
      });
      userHiddenWord = jsonResponseWord;
      console.log(userHiddenWord);
      displayHiddenCategoryWord(userHiddenWord);
    });
}

// total reset and prepares for next game
function resetGame() {
  userHiddenWord = "";
  lettersArray = [];
  lettersHiddenWordArray = [];
  wrongLettersArray = [];
  correctLetters = [];
  console.log(hangedMan);
  for (let index = 0; index < hangedMan.length; index++) {
    hangedMan[index].classList.add("figure-part");
  }
  numMistakes = 0;
  resetGameView();
  openCategoryModal();
}

//! VIEW
function displayHiddenCategoryWord(categoryHiddenWord) {
  secretWord.innerHTML = `
    ${categoryHiddenWord
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

  if (innerWord === categoryHiddenWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    popup.style.display = "flex";

    playable = false;
  }
}

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

function displayLetter(letter) {
  let wrongLetter = document.createElement("p");
  wrongLetter.classList.add("wrongLetters");
  wrongLetter.innerHTML = letter;
  wrongLetters.appendChild(wrongLetter);
}

function resetGameView() {
  finalMessage.innerText = "";
  popup.style.display = "none";
  wrongLetters.innerHTML = "";
  playable = true;
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

playAgain.addEventListener("click", resetGame);
