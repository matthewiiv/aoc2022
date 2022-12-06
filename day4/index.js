const fs = require("fs");

const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function run1() {
  const data = fs.readFileSync("./4.txt", { encoding: "utf8" });
  const duplicates = data
    .split("\n")
    .map((pair) =>
      pair.split(",").map((elf) => elf.split("-").map((area) => Number(area)))
    )
    .map((pair) =>
      pair.map((areas) =>
        [...Array(1 + areas[1] - areas[0]).keys()].map((key) => areas[0] + key)
      )
    )
    .filter(
      (pair) =>
        pair[0].every((area) => pair[1].includes(area)) ||
        pair[1].every((area) => pair[0].includes(area))
    ).length;

  console.log(duplicates);
}

run1();

function run2() {
  const data = fs.readFileSync("./4.txt", { encoding: "utf8" });
  const overlaps = data
    .split("\n")
    .map((pair) =>
      pair.split(",").map((elf) => elf.split("-").map((area) => Number(area)))
    )
    .map((pair) =>
      pair.map((areas) =>
        [...Array(1 + areas[1] - areas[0]).keys()].map((key) => areas[0] + key)
      )
    )
    .filter(
      (pair) =>
        pair[0].some((area) => pair[1].includes(area)) ||
        pair[1].some((area) => pair[0].includes(area))
    ).length;

  console.log(overlaps);
}

run2();
