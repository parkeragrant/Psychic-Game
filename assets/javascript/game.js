// Global variables
// ---------------------------------------------------------------
// Arrays and variable for holding data

var wordOptions = ["tomcruise", "tomhanks", "willsmith", "merylstreep", "nicolekidman"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0   
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game counter
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// FUNCTIONS reusalbe blocks of code that we can reuse and call on when needed
// ---------------------------------------------------------------

function startGame() {
    selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
    lettersInWord = selectedWord.split("");
    numBlanks = lettersInWord.length;

    // Reset
    guessesLeft = 9;
    wrongLetters = [];
    blanksAndSuccesses = [];

    // Populate blanks and successes with right number of blanks
    for (var i = 0; i < numBlanks; i++) {
        blanksAndSuccesses.push("_");
    }

    // Chang HTML to reflect round conditions
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("winCounter").innerHTML = winCount;
    document.getElementById("lossCounter").innerHTML = lossCount;

    // testing and debugging
    console.log(selectedWord);
    console.log(lettersInWord);
    console.log(numBlanks);
    console.log(blanksAndSuccesses);
}

function checkLetters(letter) { 

    var isLetterInWord = false;
    
    // Check if the letter exists in the word
    for (var i = 0; i < numBlanks; i++) {
        if(selectedWord[i] == letter) {
            isLetterInWord = true;
        }
    }

    if(isLetterInWord) {
    // Check where in the word the letter exists, then popluate out blanksAndSuccesses array.
        for (var i = 0; i < numBlanks; i++) {
            if(selectedWord[i] == letter) {
                blanksAndSuccesses[i] = letter;
            }
        }
    }

    else {
        wrongLetters.push(letter);
        guessesLeft--
    }

    // Testing and debugging
    console.log(blanksAndSuccesses);

    
}

function roundComplete() {
    console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left: " + guessesLeft )

    // Update the HTM to reflect the most recent count stats
    document.getElementById("numGuesses").innerHTML = guessesLeft;
    document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join("  ");
    document.getElementById("wrongGuesses").innerHTML = wrongLetters.join("  ");

    // check if user won
    if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
        winCount++;
        alert("You Won!");

        // Update the win counter in the HTML
        document.getElementById("winCounter").innerHTML = winCount;

        startGame();
    }

    // check if user lost
    else if (guessesLeft == 0) {
        lossCount++;
        alert("You lost!")

        //update the HTML
        document.getElementById("lossCounter").innerHTML = lossCount;

        startGame()
    }
}

// MAIN PROCESS
// ---------------------------------------------------------------

// Initiates the code and fist time
startGame()

document.onkeyup = function(event) {
    var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    checkLetters(letterGuessed);
    roundComplete();

    // Testing
    console.log(letterGuessed);
}