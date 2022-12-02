const fs = require("fs");

function run1() {
  const resultsMap = {
    X: ["C", "B", "A", 1],
    Y: ["A", "C", "B", 2],
    Z: ["B", "A", "C", 3],
  }; // WIN, LOSE, DRAW

  const data = fs.readFileSync("./2.txt", { encoding: "utf8" });
  const score = data
    .split("\n")
    .map((game) => game.split(" "))
    .map((game) => {
      const index = resultsMap[game[1]].indexOf(game[0]);
      const selectionPoints = resultsMap[game[1]][3];
      switch (index) {
        case 0:
          return 6 + selectionPoints;
        case 1:
          return 0 + selectionPoints;
        case 2:
          return 3 + selectionPoints;
      }
    })
    .reduce((a, b) => a + b, 0);
  console.log(score);
}

run1();

function run2() {
  const player1Move = {
    A: { name: "rock", win: "paper", draw: "rock", lose: "scissor" },
    B: { name: "paper", win: "scissor", draw: "paper", lose: "rock" },
    C: { name: "scissor", win: "rock", draw: "scissor", lose: "paper" },
  };

  const player2Move = {
    rock: 1,
    paper: 2,
    scissor: 3,
  };

  const data = fs.readFileSync("./2.txt", { encoding: "utf8" });
  const score = data
    .split("\n")
    .map((game) => game.split(" "))
    .map((game) => {
      const resultPoints = game[1] === "X" ? 0 : game[1] === "Y" ? 3 : 6;
      const player1Played = player1Move[game[0]];
      const requiredMove =
        game[1] === "X"
          ? player1Played.lose
          : game[1] === "Y"
          ? player1Played.draw
          : player1Played.win;
      return resultPoints + player2Move[requiredMove];
    })
    .reduce((a, b) => a + b);

  console.log(score);
}

run2();
