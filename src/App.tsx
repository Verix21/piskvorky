/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
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
  const [endResult, setEndResult] = useState<string>("")
  const [gameState, setGameState] = useState<GameState>("playerTurnX")

  console.log(gameState)

  const boardDimensions = (size: number) => {
    setBoardState(
      Array(size)
        .fill(null)
        .map((row) => new Array(size).fill(null))
    )
  }

  const checkRows = (i: number) => {
    if (!boardState![i].includes("x") && !boardState![i].includes(null)) {
      setGameState("playerWinO")
    }
    if (!boardState![i].includes("o") && !boardState![i].includes(null)) {
      setGameState("playerWinX")
    }
  }

  const checkCollumns = (i: number) => {
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

  const checkDiagonals = (diagonalA: Value[], diagonalB: Value[]) => {
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

  const winCondition = () => {
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

  const drawCondition = () => {
    const drawCheck = boardState!.map((row) => row.includes(null))
    if (!drawCheck.includes(true)) {
      setGameState("draw")
    }
  }

  useEffect(() => {
    if (gameState === "playerWinX") setEndResult("Player 1 (x) has won!")
    if (gameState === "playerWinO") setEndResult("Player 2 (o) has won!")
    if (gameState === "draw") setEndResult("It's a draw!!")
  }, [gameState])

  const onClick = (cellValue: Value, rowIndex: number, cellIndex: number) => {
    const boardCopy = [...boardState!]
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
        {gameState === "playerTurnX" && boardState && <p>Player one's turn</p>}
        {gameState === "playerTurnO" && boardState && <p>Player two's turn</p>}
        {endResult && <p>{endResult}</p>}
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
                    onClick={() => onClick(cellValue, rowIndex, cellIndex)}
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
            setEndResult("")
          }}
        >
          Reset board?
        </button>
      )}
    </div>
  )
}

export default App
