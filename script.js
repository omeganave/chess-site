console.log("script.js");

window.onload = function() {
    console.log("Page loaded");
    renderBoard();
};

const board = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"]
]

function renderBoard() {
    const chessboard = document.getElementById("chessboard");
    chessboard.innerHTML = "";

    for (let row = 0; row < 8; row++) {
        let tr = document.createElement("tr");
        for (let col = 0; col < 8; col++) {
            let td = document.createElement("td");
            td.classList.add((row + col) % 2 === 0 ? "white" : "black");
            td.dataset.row = row;
            td.dataset.col = col;
            td.textContent = board[row][col];
            
            td.addEventListener("click", () => handleClick(row, col));

            tr.appendChild(td);
        }
        chessboard.appendChild(tr);
    }
}

let selectedPiece = null;

function handleClick(row, col) {
    let piece = board[row][col];
    let cells = document.querySelectorAll("td");

    cells.forEach(cell => cell.classList.remove("selected"));

    console.log(`Clicked on ${row}, ${col}, piece: ${board[row][col]}`);
    if (!selectedPiece) {
        if (piece !== " ") {
            selectedPiece = { row, col, piece };
            let cell = document.querySelector(`td[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cell.classList.add("selected");
            } else {
                console.error("Selected cell not found");
            }
            console.log(`Selected piece: ${selectedPiece.piece} at ${selectedPiece.row}, ${selectedPiece.col}`);
        }
    } else {
        movePiece(selectedPiece, { row, col });
        selectedPiece = null;
    }
}

function isValidMove(piece, from, to) {
    let { row: fr, col: fc } = from;
    let { row: tr, col: tc } = to;

    if (piece === "P") {
        if (fc === tc && board[tr][tc] === " " && tr === fr - 1) return true;
    }
    if (piece === "p") {
        if (fc === tc && board[tr][tc] === " " && tr === fr + 1) return true;
    }

    return false;
}

function movePiece(from, to) {
    if (isValidMove(from.piece, from, to)) {
        board[to.row][to.col] = from.piece;
        board[from.row][from.col] = " ";
        console.log(`Moved ${from.piece} from ${from.row}, ${from.col} to ${to.row}, ${to.col}`);
        renderBoard();
    } else {
        console.log(`Invalid move: ${from.piece} from ${from.row}, ${from.col} to ${to.row}, ${to.col}`);
    }
}