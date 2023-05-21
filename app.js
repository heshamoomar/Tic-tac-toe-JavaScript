const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startCells = ["", "", "", "", "", "", "", "", ""]

let go = "circle"
infoDisplay.textContent = "Circle goes first"

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = index
        cellElement.addEventListener("click", addGo)
        gameBoard.append(cellElement)
    })
}

createBoard()

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay) // putting go on the square we clicked on

    go = go === "circle" ? "cross" : "circle" // switching go value and reassigning it up top
    infoDisplay.textContent = "it is now " + go + "'s go.";
    e.target.removeEventListener("click", addGo) // to stop activating a cell anymore if clicked
    checkScore()
}

function checkScore() {
    // grabbing all elements with the class of square every time this function is called
    const allSquares = document.querySelectorAll('.square')

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('circle'))

        if (circleWins) {
            infoDisplay.textContent = "Circle Wins!"
            // prevent clicking on any square
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))

        }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell =>
            allSquares[cell].firstChild?.classList.contains('cross'))

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins!"
            // prevent clicking on any square
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))

        }
    })
}








