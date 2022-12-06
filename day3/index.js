const fs = require("fs");

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function run1() {
  const data = fs.readFileSync("./3.txt", { encoding: "utf8" });
  const sum = data
    .split("\n")
    .map((rucksack) => [
      rucksack.slice(0, rucksack.length / 2),
      rucksack.slice(rucksack.length / 2),
    ])
    .map((rucksack) =>
      rucksack[0].split("").find((letter) => rucksack[1].includes(letter))
    )
    .map((letter) => letters.indexOf(letter) + 1)
    .reduce((a, b) => a + b);
  console.log(sum);
}

run1();

function run2() {
  const data = fs.readFileSync("./3.txt", { encoding: "utf8" });
  const sum = data
    .split("\n")
    .reduce(
      (a, b, i) =>
        i % 3 === 0
          ? [...a, [b]]
          : [...a.slice(0, a.length - 1), [...a[a.length - 1], b]],
      []
    )
    .map((group) =>
      group[0]
        .split("")
        .find(
          (letter) => group[1].includes(letter) && group[2].includes(letter)
        )
    )
    .map((letter) => letters.indexOf(letter) + 1)
    .reduce((a, b) => a + b);
  console.log(sum);
}

run2();
