/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import "./App.css"

type Value = "x" | "o" | null
type Board = Value[][] | null

function App() {
  const [boardState, setBoardState] = useState<Board>(null)
  const [playerSwitch, setPlayerSwitch] = useState<boolean>(false)
  const [win, setWin] = useState<boolean>(false)
  const [draw, setDraw] = useState<boolean>(false)
  const [endResult, setEndResult] = useState<string>("")

  const boardDimensions = (size: number) => {
    setBoardState(
      Array(size)
        .fill(null)
        .map((row) => new Array(size).fill(null))
    )
  }

  const checkRows = (i: number) => {
    if (!boardState![i].includes("x") && !boardState![i].includes(null))
      setWin(true)
    if (!boardState![i].includes("o") && !boardState![i].includes(null))
      setWin(true)
  }

  const checkCollumns = (i: number) => {
    if (
      !boardState!.map((row) => row[i]).includes("x") &&
      !boardState!.map((row) => row[i]).includes(null)
    )
      setWin(true)
    if (
      !boardState!.map((row) => row[i]).includes("o") &&
      !boardState!.map((row) => row[i]).includes(null)
    )
      setWin(true)
  }

  const checkDiagonals = (diagonalA: Value[], diagonalB: Value[]) => {
    if (!diagonalA.includes("x") && !diagonalA.includes(null)) setWin(true)
    if (!diagonalA.includes("o") && !diagonalA.includes(null)) setWin(true)
    if (!diagonalB.includes("x") && !diagonalB.includes(null)) setWin(true)
    if (!diagonalB.includes("o") && !diagonalB.includes(null)) setWin(true)
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
      setDraw(true)
    }
  }

  useEffect(() => {
    if (win && playerSwitch) setEndResult("Player 1 (x) has won!")
    if (win && !playerSwitch) setEndResult("Player 2 (o) has won!")
    if (!win && draw) setEndResult("It's a draw!!")
  }, [win, draw])

  const onClick = (cellValue: Value, rowIndex: number, cellIndex: number) => {
    const boardCopy = [...boardState!]
    if (!cellValue && !playerSwitch && !win) {
      boardCopy[rowIndex][cellIndex] = "x"
    }
    if (!cellValue && playerSwitch && !win) {
      boardCopy[rowIndex][cellIndex] = "o"
    }
    setBoardState(boardCopy)
    setPlayerSwitch(!playerSwitch)
    winCondition()
    drawCondition()
  }

  return (
    <div className="App">
      <div className="gameInfo">
        {!playerSwitch && !win && !draw && boardState && (
          <p>Player one's turn</p>
        )}
        {playerSwitch && !win && !draw && boardState && (
          <p>Player two's turn</p>
        )}
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
      {(win || draw) && (
        <button
          className="buttons"
          onClick={() => {
            setBoardState(null)
            setWin(false)
            setDraw(false)
            setEndResult("")
            setPlayerSwitch(false)
          }}
        >
          Reset board?
        </button>
      )}
    </div>
  )
}

export default App
