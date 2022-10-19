/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react"
import "./App.css"

type Value = "x" | "o" | null
type Board = Value[][] | null
type GameState =
  | "playerTurnX"
  | "playerTurnO"
  | "playerWinX"
  | "playerWinO"
  | "draw"

function App() {
  const [boardState, setBoardState] = useState<Board>(null)
  const [gameState, setGameState] = useState<GameState>("playerTurnX")

  const boardDimensions = (size: number): void => {
    setBoardState(
      Array(size)
        .fill(null)
        .map((row) => new Array(size).fill(null))
    )
  }

  const checkRows = (i: number): void => {
    if (!boardState![i].includes("x") && !boardState![i].includes(null)) {
      setGameState("playerWinO")
    }
    if (!boardState![i].includes("o") && !boardState![i].includes(null)) {
      setGameState("playerWinX")
    }
  }

  const checkCollumns = (i: number): void => {
    if (
      !boardState!.map((row) => row[i]).includes("x") &&
      !boardState!.map((row) => row[i]).includes(null)
    ) {
      setGameState("playerWinO")
    }
    if (
      !boardState!.map((row) => row[i]).includes("o") &&
      !boardState!.map((row) => row[i]).includes(null)
    ) {
      setGameState("playerWinX")
    }
  }

  const checkDiagonals = (diagonalA: Value[], diagonalB: Value[]): void => {
    if (!diagonalA.includes("x") && !diagonalA.includes(null)) {
      setGameState("playerWinO")
    }
    if (!diagonalA.includes("o") && !diagonalA.includes(null)) {
      setGameState("playerWinX")
    }
    if (!diagonalB.includes("x") && !diagonalB.includes(null)) {
      setGameState("playerWinO")
    }
    if (!diagonalB.includes("o") && !diagonalB.includes(null)) {
      setGameState("playerWinX")
    }
  }

  const winCondition = (): void => {
    let diagonalA: Value[] = []
    let diagonalB: Value[] = []

    for (let i = 0; i < boardState!.length; i++) {
      for (let j = 0; j < boardState!.length; j++) {
        if (i === j) diagonalA.push(boardState![i][j])
        if (i + j === boardState!.length - 1) diagonalB.push(boardState![i][j])
      }
      checkRows(i)
      checkCollumns(i)
    }
    checkDiagonals(diagonalA, diagonalB)
  }

  const drawCondition = (): void => {
    const drawCheck: boolean[] = boardState!.map((row) => row.includes(null))
    if (!drawCheck.includes(true)) {
      setGameState("draw")
    }
  }

  const handleTurn = (
    cellValue: Value,
    rowIndex: number,
    cellIndex: number
  ): void => {
    const boardCopy: Board = [...boardState!]
    if (!cellValue && gameState === "playerTurnX") {
      boardCopy[rowIndex][cellIndex] = "x"
    }
    if (!cellValue && gameState === "playerTurnO") {
      boardCopy[rowIndex][cellIndex] = "o"
    }
    setBoardState(boardCopy)
    if (gameState === "playerTurnO") setGameState("playerTurnX")
    if (gameState === "playerTurnX") setGameState("playerTurnO")
    drawCondition()
    winCondition()
  }

  return (
    <div className="App">
      <div className="gameInfo">
        {gameState === "playerTurnX" && boardState && (
          <p>Player one's (x) turn</p>
        )}
        {gameState === "playerTurnO" && boardState && (
          <p>Player two's (o) turn</p>
        )}
        {gameState === "playerWinX" && <p>Player 1 (x) has won!</p>}
        {gameState === "playerWinO" && <p>Player 2 (o) has won!</p>}
        {gameState === "draw" && <p>It's a draw!</p>}
      </div>
      {!boardState && (
        <div className="startScreen">
          <p>Select board size:</p>
          <button className="buttons" onClick={() => boardDimensions(3)}>
            3x3
          </button>
          <button className="buttons" onClick={() => boardDimensions(4)}>
            4x4
          </button>
          <button className="buttons" onClick={() => boardDimensions(5)}>
            5x5
          </button>
        </div>
      )}
      {boardState && (
        <table className="board">
          <tbody>
            {boardState.map((row, rowIndex) => (
              <tr className="row" key={rowIndex}>
                {row.map((cellValue, cellIndex) => (
                  <td
                    className="boardCell"
                    key={cellIndex}
                    onClick={() => handleTurn(cellValue, rowIndex, cellIndex)}
                  >
                    {cellValue}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {(gameState === "playerWinX" ||
        gameState === "playerWinO" ||
        gameState === "draw") && (
        <button
          className="buttons"
          onClick={() => {
            setBoardState(null)
            setGameState("playerTurnX")
          }}
        >
          Reset board?
        </button>
      )}
    </div>
  )
}

export default App
