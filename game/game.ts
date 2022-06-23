/**
 * getScore(snake): number # of snake pieces
 * snake: [coord] // start the game with default length and default positions
 * isCollision(coord: Coord, snake): boolean  check against boundaries (its own function), (for now not optimal) iterate through snake array to see if snake eats snake
 * foodLocation: Coord
 * randomLocation(snake, ROWS, COLS): Coord      places food (pretty easy math.random)
 * speed: (implement later)  after every 5 foods we can increase frame rate by 5%
 * updateSpeed(food): number
 */

export type BoardTile = "snake" | "empty" | "food"

export type Coordinate = {
  row: number
  col: number
}

type Snake = Coordinate[]

type Speed = number

const isBoundary = (coordinate: Coordinate, bounds: Bounds): boolean =>
  coordinate.row < 0 ||
  coordinate.row > bounds.rows ||
  coordinate.col < 0 ||
  coordinate.col > bounds.cols

const isSnakeCollision = (coordinate: Coordinate, snake: Snake) =>
  Boolean(
    snake.find(
      (snakeCoordinate) =>
        snakeCoordinate.row === coordinate.row &&
        snakeCoordinate.col === coordinate.col
    )
  )

export const isCollision = (
  coordinate: Coordinate,
  bounds: Bounds,
  snake: Snake
): boolean =>
  isBoundary(coordinate, bounds) || isSnakeCollision(coordinate, snake)

export const getFoodSpot = (bounds: Bounds, snake: Snake): Coordinate => {
  const boardSpots = listBoardSpots(bounds)

  snake.forEach((piece) => boardSpots.delete(piece))

  return pickRandomElementFromSet(boardSpots)
}

const listBoardSpots = (bounds: Bounds): Set<Coordinate> => {
  const boardSpots: Set<Coordinate> = new Set()

  for (let row = 0; row < bounds.rows; row++) {
    for (let col = 0; col < bounds.cols; col++) {
      boardSpots.add({ row, col })
    }
  }

  return boardSpots
}

const pickRandomElementFromSet = <T>(set: Set<T>): T =>
  Array.from(set)[Math.floor(Math.random() * set.size)]

export type Bounds = {
  rows: number
  cols: number
}

const generateBoard = (bounds: Bounds): BoardTile[][] =>
  Array(bounds.rows)
    .fill(0)
    .map(() => Array(bounds.cols).fill("empty"))
// new Array(bounds.rows).fill(new Array(bounds.cols).fill("empty")) // bug

export const render = (
  snake: Snake,
  bounds: Bounds,
  foodSpot: Coordinate
): BoardTile[][] => {
  let board = generateBoard(bounds)

  snake.forEach((coordinate) => {
    board[coordinate.row][coordinate.col] = "snake"
  })

  board[foodSpot.row][foodSpot.col] = "food"

  return board
}
