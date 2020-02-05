function createTiles() {
  let tiles = [];
  let tile = [];
  for (let i = 0; i <= 6; i++) {
    for (let j = 0; j <= i; j++) {
      tile = [j, i];
      tiles.push(tile);
    }
  }
  return tiles;
}

function shuffleTiles(tiles) {
  tiles.sort(() => Math.random() - 0.5);
  return tiles;
}

function firstMove(gameBoard, tilesPlayerOne) {
  let firstTile = tilesPlayerOne.pop();
  gameBoard.push(firstTile);
  console.log(`player 1 played <${firstTile[0]}:${firstTile[1]}>`);
}
function nextMove(gameBoard, playerTiles, pile, player) {
  let gameBoardFlat = gameBoard.flat();
  let playerTilesFlat = playerTiles.flat();
  let tileToAdd = "";
  while (
    !playerTilesFlat.includes(gameBoardFlat[0]) &&
    !playerTilesFlat.includes(gameBoardFlat[gameBoardFlat.length - 1])
  ) {
    let drawnTile = pile.pop();
    playerTiles.push(drawnTile);
    playerTilesFlat = playerTiles.flat();
    console.log(`<${drawnTile[0]}:${drawnTile[1]}> is drawn by ${player}`);
  }

  for (let index = 0; index < playerTiles.length; index++) {
    if (gameBoardFlat[0] === playerTiles[index][0]) {
      tileToAdd = playerTiles
        .splice(index, 1)
        .flat()
        .reverse();
      gameBoard.unshift(tileToAdd);
      console.log(`${player} added <${tileToAdd[0]}:${tileToAdd[1]}>`);
      break;
    } else if (
      gameBoardFlat[gameBoardFlat.length - 1] === playerTiles[index][0]
    ) {
      tileToAdd = playerTiles.splice(index, 1).flat();
      gameBoard.push(tileToAdd);
      console.log(`${player} added <${tileToAdd[0]}:${tileToAdd[1]}>`);
      break;
    } else if (
      gameBoardFlat[gameBoardFlat.length - 1] === playerTiles[index][1]
    ) {
      tileToAdd = playerTiles
        .splice(index, 1)
        .flat()
        .reverse();
      gameBoard.push(tileToAdd);
      console.log(`${player} added <${tileToAdd[0]}:${tileToAdd[1]}>`);
      break;
    } else if (gameBoardFlat[0] === playerTiles[index][1]) {
      tileToAdd = playerTiles.splice(index, 1).flat();

      gameBoard.unshift(tileToAdd);
      console.log(`${player} added <${tileToAdd[0]}:${tileToAdd[1]}>`);
      break;
    }
  }
}
function printGameBoard(gameBoard) {
  let str = "";
  gameBoard.map(tile => (str += `<${tile[0]}:${tile[1]}>`));
  console.log("now the board is ", str);
}

function main() {
  let tiles = shuffleTiles(createTiles());
  let tilesPlayerOne = tiles.slice(0, 7);
  let tilesPlayerTwo = tiles.slice(7, 14);
  let pile = tiles.slice(14, 28);
  let gameBoard = [];
  firstMove(gameBoard, tilesPlayerOne);
  printGameBoard(gameBoard);
  while (tilesPlayerOne.length >= 1 && tilesPlayerTwo.length >= 1) {
    nextMove(gameBoard, tilesPlayerTwo, pile, "player 2");
    printGameBoard(gameBoard);
    if (tilesPlayerTwo.length === 0) {
      console.log("Player 2 wins!!");
      break;
    }

    nextMove(gameBoard, tilesPlayerOne, pile, "player 1");
    printGameBoard(gameBoard);
    if (tilesPlayerOne.length === 0) {
      console.log("Player 1 wins!!");
    }
  }
}
main();
