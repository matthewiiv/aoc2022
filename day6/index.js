const fs = require("fs");

const signal = fs.readFileSync("./signal.txt", { encoding: "utf8" }).split("");

function isUnique(value, index, array) {
  return array.indexOf(value) === index;
}

const markerPosition1 =
  signal.findIndex(
    (character, i) => signal.slice(i, i + 4).filter(isUnique).length === 4
  ) + 4;

const markerPosition2 =
  signal.findIndex(
    (character, i) => signal.slice(i, i + 14).filter(isUnique).length === 14
  ) + 14;
