const fs = require("fs");

const navigation = fs
  .readFileSync("./navigation.txt", { encoding: "utf8" })
  .split("\n");

const directoryStructure = {};
let directoryArray = [];

function recursivelyAccessNestedObject(object, keys) {
  return keys.reduce(
    (obj, key) =>
      ![null, undefined].includes(obj && obj[key]) ? obj[key] : undefined,
    object
  );
}

for (const command of navigation) {
  const commandComponents = command
    .split(" ")
    .map((component) => component.trim());

  switch (commandComponents[0]) {
    case "$":
      switch (commandComponents[1]) {
        case "cd":
          switch (commandComponents[2]) {
            case "/":
              directoryArray = [];
              break;
            case "..":
              directoryArray.pop();
              break;
            default:
              const currentDirectory = recursivelyAccessNestedObject(
                directoryStructure,
                directoryArray
              );
              currentDirectory[commandComponents[2]] =
                currentDirectory[commandComponents[2]] ?? {};
              directoryArray.push(commandComponents[2]);
              break;
          }
          break;
        case "ls":
          break;
      }
      break;
    case "dir":
      break;
    default:
      const fileSize = parseInt(commandComponents[0], 10);
      const currentDirectory = recursivelyAccessNestedObject(
        directoryStructure,
        directoryArray
      );
      currentDirectory.$fileSize = (currentDirectory.$fileSize ?? 0) + fileSize;
      break;
  }
}

const lessThan100000 = [];

function calculateDirectorySize(directory) {
  let $size = directory.$fileSize || 0;

  $size += Object.entries(directory)
    .filter(([key]) => !key.startsWith("$"))
    .map(([key, subDirectory]) => calculateDirectorySize(subDirectory))
    .reduce((a, b) => a + b, 0);

  if ($size < 100000) {
    lessThan100000.push($size);
  }
  return $size;
}

calculateDirectorySize(directoryStructure);
console.log(
  "ANSWER 1",
  lessThan100000.reduce((a, b) => a + b, 0)
);

const spaceUsed = calculateDirectorySize(directoryStructure);
const spaceNeeded = 30000000 - (70000000 - spaceUsed);
console.log("spaceUsed", spaceUsed);
console.log("spaceNeeded", spaceNeeded);

const greaterThanSpaceNeeded = [];

function calculateDirectorySizeAgain(directory) {
  let $size = directory.$fileSize || 0;

  $size += Object.entries(directory)
    .filter(([key]) => !key.startsWith("$"))
    .map(([key, subDirectory]) => calculateDirectorySizeAgain(subDirectory))
    .reduce((a, b) => a + b, 0);

  if ($size > spaceNeeded) {
    greaterThanSpaceNeeded.push($size);
  }
  return $size;
}

calculateDirectorySizeAgain(directoryStructure);

console.log(Math.min(...greaterThanSpaceNeeded));
