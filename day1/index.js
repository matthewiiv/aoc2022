const fs = require("fs");

function run1() {
  const data = fs.readFileSync("./1.txt", { encoding: "utf8" });
  const maxValue = Math.max(
    ...data.split("\n\n").map((group) =>
      group
        .split("\n")
        .map((value) => Number(value))
        .reduce((acc, el) => acc + el, 0)
    )
  );
  console.log(maxValue);
}

function run2() {
  const data = fs.readFileSync("./1.txt", { encoding: "utf8" });
  const topThreeValue = data
    .split("\n\n")
    .map((group) =>
      group
        .split("\n")
        .map((value) => Number(value))
        .reduce((acc, el) => acc + el, 0)
    )
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((acc, el) => acc + el, 0);
  console.log(topThreeValue);
}

run1();
run2();
