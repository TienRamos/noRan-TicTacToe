let boxes = [];
let playerScore = 1;
let noranScore = 1;
let prime = [2, 3, 5, 7, 11, 13, 17, 19, 23];
let winCombination = [30, 1001, 7429, 238, 627, 1495, 506, 935];
let nextMove = [];
let turnsLeft = 9;
let indexOfClicked = 0;
let b = document.querySelectorAll(".box");
let image = document.querySelector(".image");
let playerDisplay = 0;
let noranDisplay = 0;

//Creates 9 objects in boxes array
for (var i = 0; i < 9; i++) {
  boxes.push(new CreateBox(i, prime[i], true))
}

function CreateBox(position, value, open) {
  this.position = position;
  this.value = value;
  this.open = true;
  this.winning = function() {
    check(playerScore, this.value, this.position);
    return check();
  }
}

//Record score
function scoreUpdate() {
  document.querySelectorAll("h3")[0].innerHTML = playerDisplay;
  document.querySelectorAll("h3")[1].innerHTML = noranDisplay;
}

//Button functions
document.querySelectorAll(".button")[0].addEventListener("click", function() {
  buttonFunctions(this.innerHTML);
})

function buttonFunctions(x) {
  switch (x) {
    case "reset":
      window.location.reload()
      break;
    case "play again":
      indexOfClicked = 0;
      playerScore = 1;
      noranScore = 1;
      nextMove = [];
      turnsLeft = 9;
      document.querySelectorAll(".button")[0].innerHTML = "reset";
      image.setAttribute("src", "images/yourturn.png");

      for (var i = 0; i < prime.length; i++) {
        document.querySelectorAll(".box")[i].innerHTML = i;
        document.querySelectorAll(".box")[i].style.color = "transparent"
      }
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].open = true;
      }
      break;
    default:

  }
}


//checks if value of box (parameter b) is a winning value
function check(a, b, c) {
  for (var i = 0; i < winCombination.length; i++) {
    if ((a * b / winCombination[i]) % 1 === 0) {
      nextMove.push(c);
    }
  }
  if (nextMove.length > 0) {
    return true;
  } else {
    return false;
  }
}

//Marks box X or O
function markBox(position, mark) {
  b[position].innerHTML = mark;
  b[position].style.color = "#F6F2D4";
  boxes[position].open = false;
}

//Determines box cliked by PLAYER
for (var i = 0; i < document.querySelectorAll(".box").length; i++) {
  document.querySelectorAll(".box")[i].addEventListener("click", function() {
    indexOfClicked = parseFloat(this.innerHTML);
    console.log(boxes);
    if (boxes[indexOfClicked].open && turnsLeft > 0) {
      playerTurn(boxes[this.innerHTML]);
    } else {
      console.log("box is closed");
    }
  })
}

//Player's Turn
function playerTurn(boxObject) {
  turnsLeft--;
  nextMove = [];
  markBox(boxObject.position, "X")

  if (boxObject.winning()) {
    console.log("You Win 🙄");
    image.setAttribute("src", "images/youwin.png");
    playerDisplay++;
    turnsLeft = 0;
    scoreUpdate();
    document.querySelectorAll(".button")[0].innerHTML = "play again";
  } else {
    playerScore = playerScore * boxObject.value;
    if (turnsLeft > 0) {
      console.log("noRan's turn");
      image.setAttribute("src", "images/myturn.png");
      setTimeout(noranTurn, 2000);
    } else {
      console.log("DRAW");
      image.setAttribute("src", "images/draw.png");
      document.querySelectorAll(".button")[0].innerHTML = "play again";
    }
  }
}

//Look for winning boxes to Block
function noranTurn() {
  turnsLeft--;
  nextMove = [];
  let openBoxes = boxes.filter(box => box.open !== false);

  for (var i = 0; i < openBoxes.length; i++) {
    check(noranScore, openBoxes[i].value, openBoxes[i].position);
  }

  if (nextMove.length === 0) {
    for (var i = 0; i < openBoxes.length; i++) {
      check(playerScore, openBoxes[i].value, openBoxes[i].position);
    }
  }
  let a = 0;
  if (nextMove.length === 0) {

    let pattern = [
      [0, 8, 2],
      [0, 8, 6],
      [2, 6, 0],
      [2, 6, 8],
      [6, 2, 8],
      [6, 2, 0],
      [8, 0, 6],
      [8, 0, 2]
    ];
    let r = pattern[(Math.floor(Math.random() * 8))];

    if (boxes[4].open) {
      markBox(4, "O");
      a = boxes[4];
    } else if (boxes[r[0]].open) {
      markBox(r[0], "O");
      a = boxes[r[0]];
    } else if (boxes[r[1]].open) {
      markBox(r[1], "O");
      a = boxes[r[1]];
    } else {
      markBox(r[2], "O");
      a = boxes[r[2]];
    }
  } else {
    let blockBox = boxes[nextMove[0]];
    markBox(blockBox.position, "O");
    a = blockBox;
  }

  nextMove = [];
  if (check(noranScore, a.value, a.position)) {
    image.setAttribute("src", "images/iwin.png");
    noranDisplay++;
    turnsLeft = 0;
    document.querySelectorAll(".button")[0].innerHTML = "play again";
    scoreUpdate();
  } else {
    noranScore = noranScore * a.value;
    image.setAttribute("src", "images/yourturn.png");
  }
}
