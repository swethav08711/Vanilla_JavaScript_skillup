//HTML elements

const statusDiv = document.querySelector(".status")
const resetDiv = document.querySelector(".reset")
const cellDivs = document.querySelectorAll(".game-cell")
//
//game contansta
const xSybmol = "×"
const oSymbol = "○"
//game variables
let gameIsLive = true
let xIsNext = true

//functions

const letterToSymbol = letter => (letter === "x" ? xSybmol : oSymbol)
const handleWin = letter => {
  gameIsLive = false

  if (letter === "x") {
    statusDiv.innerHTML = `${letterToSymbol(letter)} has Won!`
  } else {
    statusDiv.innerHTML = `<span>${letterToSymbol(letter)} has won!</span>`
  }
}
const checkGameStatus = () => {
  const topLeft = cellDivs[0].classList[1]
  const topMiddle = cellDivs[1].classList[1]
  const topRight = cellDivs[2].classList[1]
  const middleLEft = cellDivs[3].classList[1]
  const middleMiddle = cellDivs[4].classList[1]
  const middleRIght = cellDivs[5].classList[1]
  const bottomLeft = cellDivs[6].classList[1]
  const bottomMiddle = cellDivs[7].classList[1]
  const bottomRight = cellDivs[8].classList[1]

  //*is ther a winner
  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    handleWin(topLeft)
    cellDivs[0].classList.add("won")
    cellDivs[1].classList.add("won")
    cellDivs[2].classList.add("won")
  } else if (
    middleLEft &&
    middleLEft === middleMiddle &&
    middleLEft === middleRIght
  ) {
    handleWin(middleLEft)
    cellDivs[3].classList.add("won")
    cellDivs[4].classList.add("won")
    cellDivs[5].classList.add("won")
  } else if (
    bottomLeft &&
    bottomLeft === bottomMiddle &&
    bottomLeft == bottomRight
  ) {
    handleWin(bottomLeft)
    cellDivs[6].classList.add("won")
    cellDivs[7].classList.add("won")
    cellDivs[8].classList.add("won")
  } else if (topLeft && topLeft === middleLEft && topLeft === bottomLeft) {
    handleWin(topLeft)
    cellDivs[0].classList.add("won")
    cellDivs[3].classList.add("won")
    cellDivs[6].classList.add("won")
  } else if (
    topMiddle &&
    topMiddle === middleMiddle &&
    topMiddle === bottomMiddle
  ) {
    handleWin(topMiddle)
    cellDivs[1].classList.add("won")
    cellDivs[4].classList.add("won")
    cellDivs[7].classList.add("won")
  } else if (
    topRight &&
    topRight === middleRIght &&
    middleRIght &&
    topRight === bottomRight
  ) {
    handleWin(topRight)
    cellDivs[2].classList.add("won")
    cellDivs[5].classList.add("won")
    cellDivs[8].classList.add("won")
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    handleWin(topLeft)
    cellDivs[0].classList.add("won")
    cellDivs[4].classList.add("won")
    cellDivs[8].classList.add("won")
  } else if (
    topRight & (topRight === middleMiddle) &&
    topRight === bottomLeft
  ) {
    handleWin(topRight)
    cellDivs[2].classList.add("won")
    cellDivs[4].classList.add("won")
    cellDivs[6].classList.add("won")
  } else if (
    topLeft &&
    topMiddle &&
    topRight &&
    middleLEft &&
    middleMiddle &&
    middleRIght &&
    bottomLeft &&
    bottomMiddle &&
    bottomRight
  ) {
    gameIsLive = false
    statusDiv.innerHTML = "Game is tied!"
  } else {
    xIsNext = !xIsNext
    if (xIsNext) {
      statusDiv.innerHTML = `${xSybmol} is next`
    } else {
      statusDiv.innerHTML = `<span>${oSymbol} is next</span>`
    }
  }
}
//event handeler
const handleRest = () => {
  xIsNext = true
  statusDiv.innerHTML = `${xSybmol} is next`

  for (const cellDiv of cellDivs) {
    cellDiv.classList.remove("x")
    cellDiv.classList.remove("o")
    cellDiv.classList.remove("won")
  }
  gameIsLive = true
}
const handleCellClick = e => {
  const classList = e.target.classList

  console.log(location)
  if (!gameIsLive || classList[1] === "x" || classList[1] === "o") {
    return
  }
  if (xIsNext) {
    classList.add("x")
    checkGameStatus()
  } else {
    classList.add("o")
    checkGameStatus()
  }
}
//event LIstener
resetDiv.addEventListener("click", handleRest)
for (const cellDiv of cellDivs) {
  cellDiv.addEventListener("click", handleCellClick)
}
