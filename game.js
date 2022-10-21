const xField = `<svg class ="x svg" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" 
xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 
.75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 
.427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 
0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>`
const oField = `<svg class="o svg" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" 
viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2c5.517 0 9.997 4.48 9.997 9.998 
0 5.517-4.48 9.997-9.997 9.997-5.518 0-9.998-4.48-9.998-9.997 0-5.518 4.48-9.998 9.998-9.998zm0 1.5c-4.69 0-8.498 3.808-8.498 
8.498s3.808 8.497 8.498 8.497 8.497-3.807 8.497-8.497-3.807-8.498-8.497-8.498z" fill-rule="nonzero"/></svg>`
const cell1 = document.getElementById("1"),
    cell2 = document.getElementById("2"),
    cell3 = document.getElementById("3"),
    cell4 = document.getElementById("4"),
    cell5 = document.getElementById("5"),
    cell6 = document.getElementById("6"),
    cell7 = document.getElementById("7"),
    cell8 = document.getElementById("8"),
    cell9 = document.getElementById("9")

const winMsg = document.querySelector(".win-msg"),
    scoreMsg = document.querySelector(".score-msg")

let turn = 0, // 0 = X, 1 = O
    round = 0,
    win = false,
    tie = false,
    score = {
        O: 0,
        X: 0,
    }

function drawField(cell) {
    if (cell.dataset.value !== "") {
        return false // guard clause
    }

    if (turn === 0) {
        cell.innerHTML = xField // render svg
        cell.dataset.value = "X" // update html data value
        turn++ // switch player
        return true
    } else {
        cell.innerHTML = oField
        cell.dataset.value = "O"
        turn--
        return true
    }
}

function checkTie() {
    if (round === 9 && !win) {
        return true
    }
}

function checkWin() {
    if (
        cell1.dataset.value === cell2.dataset.value && // checks for first horizontal win condition
        cell2.dataset.value === cell3.dataset.value &&
        cell2.dataset.value !== ""
    ) {
        return true
    } else if (
        cell4.dataset.value === cell5.dataset.value && // checks for second horizontal win condition
        cell5.dataset.value === cell6.dataset.value &&
        cell5.dataset.value !== ""
    ) {
        return true
    } else if (
        cell7.dataset.value === cell8.dataset.value && // checks for third horizontal win condition
        cell8.dataset.value === cell9.dataset.value &&
        cell8.dataset.value !== ""
    ) {
        return true
    } else if (
        cell1.dataset.value === cell4.dataset.value && // checks for first vertical win condition
        cell4.dataset.value === cell7.dataset.value &&
        cell7.dataset.value !== ""
    ) {
        return true
    } else if (
        cell2.dataset.value === cell5.dataset.value && // checks for second vertical win condition
        cell5.dataset.value === cell8.dataset.value &&
        cell5.dataset.value !== ""
    ) {
        return true
    } else if (
        cell3.dataset.value === cell6.dataset.value && // checks for third vertical win condition
        cell6.dataset.value === cell9.dataset.value &&
        cell6.dataset.value !== ""
    ) {
        return true
    } else if (
        cell1.dataset.value === cell5.dataset.value && // checks for first diagonal win condition
        cell5.dataset.value === cell9.dataset.value &&
        cell5.dataset.value !== ""
    ) {
        return true
    } else if (
        cell3.dataset.value === cell5.dataset.value && // checks for second diagonal win condition
        cell5.dataset.value === cell7.dataset.value &&
        cell5.dataset.value !== ""
    ) {
        return true
    } else {
        return false
    }
}

function initializeGame() {
    win = false
    tie = false
    turn = 0
    round = 0
    winMsg.textContent = ""
    cell1.dataset.value = ""
    cell2.dataset.value = ""
    cell3.dataset.value = ""
    cell4.dataset.value = ""
    cell5.dataset.value = ""
    cell6.dataset.value = ""
    cell7.dataset.value = ""
    cell8.dataset.value = ""
    cell9.dataset.value = ""
    document.querySelectorAll(".svg").forEach((svg) => {
        svg.remove()
    })
}

document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", () => {
        if (win || tie || !drawField(cell)) {
            return
        }
        round++
        if (checkWin()) {
            win = true
            if (turn === 0) {
                score.O += 5
                scoreMsg.innerHTML = `Score:<br> X: ${score.X}<br> O: ${score.O}`
                winMsg.textContent = "O won! Click to restart."
                winMsg.addEventListener("click", () => {
                    initializeGame()
                })
            } else {
                score.X += 5
                scoreMsg.innerHTML = `Score:<br> X: ${score.X}<br> O: ${score.O}`
                winMsg.textContent = "X won! Click to restart."
                winMsg.addEventListener("click", () => {
                    initializeGame()
                })
            }
        }
        if (checkTie()) {
            tie = true
            winMsg.textContent = "Tie! Click to restart."
            winMsg.addEventListener("click", () => {
                initializeGame()
            })
        }
    })
})

// TODOS:
// - disable inputs when games have been won [X]
// - display score [X]
// - store score in local storage
// - button to wipe score [X]
// - animate on win
