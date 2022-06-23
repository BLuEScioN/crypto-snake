// var board =   new Array(5).fill(new Array(5).fill("empty"))

var board = []
for (var row = 0; row < 5; row++) {
  var rowArray = []
  for (var col = 0; col < 5; col++) {
    rowArray.push("empty")
  }
  board.push(rowArray)
}
console.log("board", board)
board[0][0] = "full"
console.log("board[0][0]", board[0][0])
console.log("board[0]", board[0])
console.log("board", board)
