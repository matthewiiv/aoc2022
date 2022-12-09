const fs = require("fs");

const grid = fs
  .readFileSync("./grid.txt", { encoding: "utf8" })
  .split("\n")
  .map((row) => row.split("").map((tree) => parseInt(tree, 10)));

const gridWidth = grid[0].length;
const gridHeight = grid.length;

let visible = 0;

for (const [y, row] of grid.entries()) {
  for (const [x, tree] of grid[y].entries()) {
    const visibleLeft = row.slice(0, x).every((otherTree) => otherTree < tree);
    const visibleRight = row
      .slice(x + 1, gridWidth)
      .every((otherTree) => otherTree < tree);
    const visibleTop = [...Array(y)]
      .map((arg, i) => grid[i][x])
      .every((otherTree) => otherTree < tree);
    const visibleBottom = [...Array(gridHeight - y - 1)]
      .map((arg, i) => grid[y + i + 1][x])
      .every((otherTree) => otherTree < tree);

    visible +=
      visibleLeft || visibleRight || visibleBottom || visibleTop ? 1 : 0;
  }
}

console.log("VISIBLE", visible);

let maxScenicScore = 0;

function visibleTrees(height, treeLine) {
  return treeLine.length
    ? treeLine.findIndex((t) => t >= height) === -1
      ? treeLine.length
      : treeLine.findIndex((t) => t >= height) + 1
    : 0;
}

for (const [y, row] of grid.entries()) {
  for (const [x, tree] of grid[y].entries()) {
    const visibleLeft = visibleTrees(tree, row.slice(0, x).reverse());
    const visibleRight = visibleTrees(tree, row.slice(x + 1, gridWidth));
    const visibleUp = visibleTrees(
      tree,
      [...Array(y)].map((arg, i) => grid[i][x]).reverse()
    );
    const visibleDown = visibleTrees(
      tree,
      [...Array(gridHeight - y - 1)].map((arg, i) => grid[y + i + 1][x])
    );

    const scenicScore = visibleUp * visibleDown * visibleLeft * visibleRight;
    if (scenicScore > maxScenicScore) {
      maxScenicScore = scenicScore;
    }
  }
}

console.log("BEST SCENIC SCORE", maxScenicScore);
