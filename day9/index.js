const fs = require("fs");

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  move(vector) {
    this.x += vector.x;
    this.y += vector.y;
  }
  diff(vector) {
    // If the vector is 1 to the left of this vector, will return {-1,0}
    return new Vector(vector.x - this.x, vector.y - this.y);
  }
  pseudoNormalize() {
    this.x = this.x / Math.abs(this.x);
    this.y = this.y / Math.abs(this.y);
    return this;
  }
  addPositionVisited(vector) {
    if (!this.positionsVisited) {
      this.positionsVisited = [new Vector(0, 0)];
    }
    if (
      !this.positionsVisited.find((pos) => this.x === pos.x && this.y === pos.y)
    ) {
      this.positionsVisited.push(vector);
    }
  }
  catchUpWith(vector) {
    const distanceToVector = this.diff(vector);
    if (
      (distanceToVector.x === 2 || distanceToVector.x === -2) &&
      distanceToVector.y === 0
    ) {
      this.move(new Vector(distanceToVector.x / 2, 0));
    } else if (
      (distanceToVector.y === 2 || distanceToVector.y === -2) &&
      distanceToVector.x === 0
    ) {
      this.move(new Vector(0, distanceToVector.y / 2));
    } else if (
      Math.abs(distanceToVector.x) === 2 ||
      Math.abs(distanceToVector.y) === 2
    ) {
      this.move(distanceToVector.pseudoNormalize());
    }
    this.addPositionVisited(new Vector(this.x, this.y));
  }
}

const moves = fs
  .readFileSync("./input.txt", { encoding: "utf8" })
  .split("\n")
  .map((move) => move.split(" "))
  .map((move) => {
    switch (move[0]) {
      case "L":
        return {
          direction: new Vector(-1, 0),
          magnitude: parseInt(move[1], 0),
        };
      case "R":
        return {
          direction: new Vector(1, 0),
          magnitude: parseInt(move[1], 0),
        };
      case "U":
        return {
          direction: new Vector(0, 1),
          magnitude: parseInt(move[1], 0),
        };
      case "D":
        return {
          direction: new Vector(0, -1),
          magnitude: parseInt(move[1], 0),
        };
    }
  });

const H = new Vector(0, 0);
const T = new Vector(0, 0);

moves.forEach((move) => {
  for (let i = 0; i < move.magnitude; i++) {
    H.move(move.direction);
    T.catchUpWith(H);
  }
});

console.log("PART ONE", T.positionsVisited.length);

const H1 = new Vector(0, 0);
const P1 = new Vector(0, 0);
const P2 = new Vector(0, 0);
const P3 = new Vector(0, 0);
const P4 = new Vector(0, 0);
const P5 = new Vector(0, 0);
const P6 = new Vector(0, 0);
const P7 = new Vector(0, 0);
const P8 = new Vector(0, 0);
const T9 = new Vector(0, 0);

moves.forEach((move) => {
  for (let i = 0; i < move.magnitude; i++) {
    H1.move(move.direction);
    P1.catchUpWith(H1);
    P2.catchUpWith(P1);
    P3.catchUpWith(P2);
    P4.catchUpWith(P3);
    P5.catchUpWith(P4);
    P6.catchUpWith(P5);
    P7.catchUpWith(P6);
    P8.catchUpWith(P7);
    T9.catchUpWith(P8);
  }
});

console.log("PART TWO", T9.positionsVisited.length);
