document.addEventListener("DOMContentLoaded", () => {

    let vocab = [];
    let keyWord = '';
    let submittedWordsArray = [];
    let currentWordArray = [];
    let keys = [];
    let keyLookup = new Map();
    let guessedKeysMap = new Map();
    let gameCurrentState = '';

    const gameStates = {
        progress: 'in_progress',
        won: 'won'
    }

    const createScene = async () => {
        guessedWordsArray = [];
        currentWordArray = [];

        // loading vocab
        await loadFile('https://alexonov.github.io/wordle-ru/assets/words_5_letters.txt');

        // keyWord = generateNewDailyWord();
        keyWord = 'такси';

        // console.log(`pss.. the word in ${keyWord}`);

        createSquares();

        // getting keys
        keys = document.querySelectorAll('.keyboard-row button');

        // create key lookup
        for (const key of keys) {
            let letter = key.getAttribute("data-key");
            keyLookup.set(letter, key);
        }

        // assigning onclick to keys
        for (let i = 0; i < keys.length; i++) {
            keys[i].onclick = ({
                target
            }) => {

                const letter = target.getAttribute("data-key");

                handleNewLetter(letter);
            };

        }

        gameCurrentState = gameStates.progress;
    }

    createScene();
    window.addEventListener('keydown', handleKeyDown);


    // =============================================================
    
    function createSquares() {
        const gameBoard = document.getElementById("board");

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);

        }
    };

    async function loadFile(url) {
        try {
            const response = await fetch(url);
            const data = await response.text();
            vocab = data.split('\n');
        } catch (err) {
            console.error(err);
        }
    };

    function isValidWord(word) {
        return vocab.includes(word.toLowerCase());
    };
});