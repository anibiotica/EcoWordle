var height = 6; // Número de intentos
var width = 5; // Longitud de la palabra
var row = 0; // Intento actual
var col = 0; // Letra actual en ese intento
var gameOver = false;

// Array con palabras a adivinar y sus mensajes correspondientes
var words = [
    { word: "SQUID", message: "¡Has adivinado la palabra 'SQUID'!" },
    { word: "TIGER", message: "¡Gran trabajo! 'TIGER' es la palabra correcta." },
    { word: "APPLE", message: "Correcto, la palabra es 'APPLE'." },
    { word: "CHAIR", message: "¡Eso es! 'CHAIR' es la palabra correcta." },
    { word: "BREAD", message: "Palabra adivinada: 'BREAD'." },
    { word: "WATER", message: "¡Maravilloso! La palabra correcta es 'WATER'." },
    { word: "SUNNY", message: "Bravo, 'SUNNY' es la palabra que buscabas." }
];

// Variable global para la palabra y el mensaje actual
var word;
var message;

// Obtén la fecha actual
var currentDate = new Date();

// Obtiene el día del mes (1 al 31)
var dayOfMonth = currentDate.getDate();

// Utiliza el día del mes como índice para seleccionar una palabra
var randomIndex = dayOfMonth % words.length;

// Selecciona la palabra y el mensaje correspondiente
var wordOfTheDay = words[randomIndex];
word = wordOfTheDay.word;
message = wordOfTheDay.message;

window.onload = function() {
    initialize();
};

function initialize() {
    // Resto del código de inicialización
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        if (/^[a-zA-Z]$/.test(e.key)) {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.key.toUpperCase();
                    col++;
                }
            }
        } else if (e.code == "Backspace") {
            if (col > 0) {
                col--;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        } else if (e.code == "Enter") {
            update();
            row++;
            col = 0;
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = message;
            showModal();
        }
    });
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        if (row < height) {
            let currTile = document.getElementById(row.toString() + '-' + c.toString());
            let letter = currTile.innerText;

            if (word[c] == letter) {
                currTile.classList.add("correct");
                correct++;
            } else if (word.includes(letter)) {
                currTile.classList.add("present");
            } else {
                currTile.classList.add("absent");
            }
        }
    }

    if (correct == width) {
        gameOver = true;
    }

    if (correct == width) {
        gameOver = true;
        showModal(); // Muestra la ventana modal si la respuesta es correcta
    }
    
}

function showModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    document.getElementById("modal-title").innerText = "¡Enhorabuena!";
    document.getElementById("modal-answer").innerText = message;
}



function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}
