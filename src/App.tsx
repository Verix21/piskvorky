import React, { useEffect, useState } from "react";
import "./App.css";

type Value = "x" | "o" | null;

function App() {
  const [boardSize, setBoardSize] = useState<number>();
  const [boardState, setBoardState] = useState<Value[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [player, setPlayer] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [draw, setDraw] = useState<boolean>(false);

  const dyamicWinCondition = () => {
    let diagonalA: Value[] = [];
    let diagonalB: Value[] = [];
    let diagonals: Value[] = [];
    console.log("diagonalA", diagonalA, "diagonalB", diagonalB);
    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < i; j++) {
        let k = i - j;
        diagonals.push(boardState[k][j]);
        console.log("diagTest", diagonals);
      }
    }
    for (let i = 0; i < boardState.length; i++) {
      for (let j = 0; j < boardState.length; j++) {
        if (i === j) diagonalA.push(boardState[i][j]);
        if (i + j === boardState.length - 1) diagonalB.push(boardState[i][j]);
      }
      if (!boardState[i].includes("x") && !boardState[i].includes(null))
        setWin(true);
      if (!boardState[i].includes("o") && !boardState[i].includes(null))
        setWin(true);
      if (
        !boardState.map((row) => row[i]).includes("x") &&
        !boardState.map((row) => row[i]).includes(null)
      )
        setWin(true);
      if (
        !boardState.map((row) => row[i]).includes("o") &&
        !boardState.map((row) => row[i]).includes(null)
      )
        setWin(true);
    }
    console.log("diagonalA", diagonalA, "diagonalB", diagonalB);
    if (!diagonalA.includes("x") && !diagonalA.includes(null)) setWin(true);
    if (!diagonalA.includes("o") && !diagonalA.includes(null)) setWin(true);
    if (!diagonalB.includes("x") && !diagonalB.includes(null)) setWin(true);
    if (!diagonalB.includes("o") && !diagonalB.includes(null)) setWin(true);
  };

  const drawCondition = () => {
    let drawCheck = boardState.map((row) => row.includes(null));
    if (!drawCheck.includes(true)) {
      setDraw(true);
    }
  };

  useEffect(() => {
    if (win && player) window.alert("Player 1 (x) won!");
    if (win && !player) window.alert("Player 1 (o) won!");
    if (!win && draw) window.alert("It's a draw!");
  }, [win, draw]);

  const onClick = (cellValue: Value, rowIndex: number, cellIndex: number) => {
    let boardCopy = [...boardState];
    if (!cellValue && !player && !win) {
      boardCopy[rowIndex][cellIndex] = "x";
      setBoardState(boardCopy);
      setPlayer(!player);
      dyamicWinCondition();
      drawCondition();
    }
    if (!cellValue && player && !win) {
      boardCopy[rowIndex][cellIndex] = "o";
      setBoardState(boardCopy);
      setPlayer(!player);
      dyamicWinCondition();
      drawCondition();
    }
  };

  return (
    <div className="App">
      <table className="board">
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
      </table>
    </div>
  );
}

export default App;
