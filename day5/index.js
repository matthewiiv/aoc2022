const fs = require("fs");

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function run1() {
  const crateData = fs.readFileSync("./crates.txt", { encoding: "utf8" });
  const stacks = [...Array(9).keys()].map((a) => []);

  crateData.split("\n").forEach((row) => {
    for (let i = 0; i < 9; i++) {
      const crate = row.slice(i * 4, i * 4 + 4);
      crate.includes("[") ? stacks[i].unshift(crate.trim()) : null;
    }
  });

  function moveXfromYtoZ(x, y, z) {
    for (let i = 0; i < x; i++) {
      const crate = stacks[y - 1].pop();
      stacks[z - 1].push(crate);
    }
  }

  const moveData = fs.readFileSync("./moves.txt", { encoding: "utf8" });

  moveData
    .split("\n")
    .map((move) => move.split(" "))
    .forEach((move) =>
      moveXfromYtoZ(Number(move[1]), Number(move[3]), Number(move[5]))
    );

  console.log(
    stacks
      .map((stack) => stack.pop().replace("[", "").replace("]", ""))
      .reduce((a, b) => a + b)
  );
}

run1();

function run2() {
  const crateData = fs.readFileSync("./crates.txt", { encoding: "utf8" });
  const stacks = [...Array(9).keys()].map((a) => []);

  crateData.split("\n").forEach((row) => {
    for (let i = 0; i < 9; i++) {
      const crate = row.slice(i * 4, i * 4 + 4);
      crate.includes("[") ? stacks[i].unshift(crate.trim()) : null;
    }
  });

  function moveXfromYtoZ(x, y, z) {
    const crates = stacks[y - 1].splice(-x);
    stacks[z - 1] = [...stacks[z - 1], ...crates];
  }

  const moveData = fs.readFileSync("./moves.txt", { encoding: "utf8" });

  moveData
    .split("\n")
    .map((move) => move.split(" "))
    .forEach((move) =>
      moveXfromYtoZ(Number(move[1]), Number(move[3]), Number(move[5]))
    );

  console.log(
    stacks
      .map((stack) => stack.pop().replace("[", "").replace("]", ""))
      .reduce((a, b) => a + b)
  );
}

run2();
