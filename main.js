const userData = document.getElementById("user-data")
const confirmBtn = document.getElementById("confirm-btn")
const userName = document.getElementById("user-name")
const userBet = document.getElementById("user-bet")

const blackjackFormEl = document.getElementById("blackjack-form-el")
const messageEl = document.getElementById("message-el")
const cardsEl = document.getElementById("cards-el")
const sumEl = document.getElementById("sum-el")
const userEl = document.getElementById("user-el")
const startBtn = document.getElementById("start-btn")
const newBtn = document.getElementById("new-btn")
const newGameBtn = document.getElementById("new-game-btn")


let cards = []
let sum = 0
let hasBlackjack = false
let isAlive = false

blackjackFormEl.addEventListener("submit", (evt) => {
  evt.preventDefault()
})

confirmBtn.addEventListener("click", (evt) => {
  evt.preventDefault()
  let getUserName = userName.value
  let getUserBet = userBet.value

  userEl.textContent = `${getUserName}: $${getUserBet}`
  userData.close()
  newGameBtn.setAttribute("disabled", "")
  startBtn.removeAttribute("disabled")
})

function getRandomCard() {
  let randomNumber = Math.floor(Math.random() * 13) + 1
  if (randomNumber > 10) {
    return 10
  } else if (randomNumber === 1) {
    return 11
  } else {
    return randomNumber
  }
}

function render() {
  cardsEl.textContent = `Cards: `
  for (let i = 0; i < cards.length; i++) {
    cardsEl.textContent += `${cards[i]} `
  }
  sumEl.textContent = `Sum: ${sum}`
  if (sum <= 20) {
    messageEl.textContent = `Do you want to draw a new card?`
  } else if (sum === 21) {
    messageEl.textContent = `You've got Blackjack!!`
    hasBlackjack = true
    startBtn.setAttribute("disabled", "")
    newBtn.setAttribute("disabled", "")
    newGameBtn.removeAttribute("disabled")
  } else {
    messageEl.textContent = `You're out of the game`
    isAlive = false
    newBtn.setAttribute("disabled", "")
    startBtn.setAttribute("disabled", "")
    newGameBtn.removeAttribute("disabled")
  }
}

function newGame() {
  userData.showModal()
  userName.value = ""
  userBet.value = ""
  cardsEl.textContent = `Cards:`
  sumEl.textContent = `Sum:`
  userEl.textContent = `User: $`
}

function startGame() {
  
  isAlive = true
  getRandomCard()
  let firstCard = getRandomCard()
  let secondCard = getRandomCard()
  cards=[firstCard, secondCard]
  sum = firstCard + secondCard
  render()
  newBtn.removeAttribute("disabled")
  startBtn.setAttribute("disabled", "")
}

function newCard() {
  if (isAlive === true && hasBlackjack === false) {
    let getNewCard = getRandomCard()
    cards.push(getNewCard)
    sum += getNewCard
    render()
  }
}