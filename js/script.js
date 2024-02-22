const gamePlate = document.querySelector(".gamePlate");
const boxes = document.querySelectorAll(".boxes");
var currentPlayer = "X";
var isGameOn = true;
const winningPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
]
var options = ["", "", "", "", "", "", "", "", ""]
boxes.forEach((item, index) => {
    if (item.textContent === "") {
        item.classList.add("clickable");
        item.addEventListener("click", () => {
            if (item.classList.contains("clickable") && isGameOn) {
                item.style.cursor = "pointer"
                playXO(item, index)
            }
        });
    }
})

function playXO(item, index) {
    item.innerHTML = currentPlayer;
    options[index] = currentPlayer;
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    checkWinner();
    item.classList.remove("clickable");
}
function checkWinner() {
    let isWon = false;
    for (let i = 0; i < winningPattern.length; i++) {
        const condition = winningPattern[i];
        const box1 = options[condition[0]];
        const box2 = options[condition[1]];
        const box3 = options[condition[2]];
        if (box1 == "" || box2 == "" || box3 == "") {
            continue
        }
        if (box1 == box2 && box2 == box3) {
            isWon = true;
            let victoryLine = null
            if (condition[1] - condition[0] == 1) {
                victoryLine = "horizontal"
            } else if (condition[1] - condition[0] == 3) {
                victoryLine = "vertical"
            } else if (condition[1] - condition[0] == 4) {
                victoryLine = "left2right"
            } else {
                victoryLine = "right2left"
            }
            for (let j = 0; j < condition.length; j++) {
                boxes[condition[j]].style.color = "yellow";
                boxes[condition[j]].classList.add(victoryLine);
            }
            break;
        }
    }
    if (isWon) {
        $("#statusText").text(`Player ${currentPlayer = currentPlayer == "X" ? "O" : "X"} wins`)
        isGameOn = false;
    } else {
        $("#statusText").text(`${currentPlayer}'s turn`)
    }
}

$("#resetGame").click(function () {
    currentPlayer = "X";
    isGameOn = true;
    options = ["", "", "", "", "", "", "", "", ""];
    $("#statusText").text(`Player ${currentPlayer} to start `)
    boxes.forEach(item => {
        item.classList.add("clickable")
        item.innerHTML = "";
        item.style.color = "black"
    })
})