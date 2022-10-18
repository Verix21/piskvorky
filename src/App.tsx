import React, { useEffect, useState } from "react";
import "./App.css";

type Value = "x" | "o" | null;

function App() {
  const [boardSize, setBoardSize] = useState<number>();
  const [boardState, setBoardState] = useState<Value[][]>();
  const [player, setPlayer] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [draw, setDraw] = useState<boolean>(false);
  const [endResult, setEndResult] = useState<string>();

  const boardDimensions = (size: number) => {
    setBoardState(
      Array(size)
        .fill(null)
        .map((row) => new Array(size).fill(null))
    );
  };

  const dyamicWinCondition = () => {
    let diagonalA: Value[] = [];
    let diagonalB: Value[] = [];
    let diagonalsA: Array<Value[]> = [];
    let diagonalsB: Array<Value[]> = [];
    // for (let i = 0; i < boardState.length; i++) {
    //   diagonalsA.push([]);
    //   for (let j = 0; j <= i; j++) {
    //     let k = i - j;
    //     diagonalsA[i]!.push(boardState[k][j]);
    //     console.log("diagTest", diagonalsA);
    //   }
    // }
    // for (let i = boardState.length - 2; i >= 0; i--) {
    //   diagonalsB.push([]);
    //   for (let j = 0; j <= i; j++) {
    //     let k = i - j;
    //     diagonalsB[diagonalsB.length - 1]!.push(
    //       boardState[boardSize - j - 1][boardSize - k - 1]
    //     );
    //     console.log("diagTest", diagonalsB);
    //   }
    // }
    for (let i = 0; i < boardState!.length; i++) {
      for (let j = 0; j < boardState!.length; j++) {
        if (i === j) diagonalA.push(boardState![i][j]);
        if (i + j === boardState!.length - 1) diagonalB.push(boardState![i][j]);
      }
      if (!boardState![i].includes("x") && !boardState![i].includes(null))
        setWin(true);
      if (!boardState![i].includes("o") && !boardState![i].includes(null))
        setWin(true);
      if (
        !boardState!.map((row) => row[i]).includes("x") &&
        !boardState!.map((row) => row[i]).includes(null)
      )
        setWin(true);
      if (
        !boardState!.map((row) => row[i]).includes("o") &&
        !boardState!.map((row) => row[i]).includes(null)
      )
        setWin(true);
    }
    if (!diagonalA.includes("x") && !diagonalA.includes(null)) setWin(true);
    if (!diagonalA.includes("o") && !diagonalA.includes(null)) setWin(true);
    if (!diagonalB.includes("x") && !diagonalB.includes(null)) setWin(true);
    if (!diagonalB.includes("o") && !diagonalB.includes(null)) setWin(true);
  };

  const drawCondition = () => {
    let drawCheck = boardState!.map((row) => row.includes(null));
    if (!drawCheck.includes(true)) {
      setDraw(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (win && player) setEndResult("Player 1 (x) won!");
      if (win && !player) setEndResult("Player 2 (o) won!");
      if (!win && draw) setEndResult("It's a draw!!");
    }, 100);
  }, [win, draw]);

  const onClick = (cellValue: Value, rowIndex: number, cellIndex: number) => {
    let boardCopy = [...boardState!];
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
      {!player && !win && !draw && boardState && <p>Player 1's turn</p>}
      {player && !win && !draw && boardState && <p>Player 2's turn</p>}
      {!boardState && (
        <>
          <p>Select board size:</p>
          <button onClick={() => boardDimensions(3)}>3x3</button>
          <button onClick={() => boardDimensions(4)}>4x4</button>
          <button onClick={() => boardDimensions(5)}>5x5</button>
        </>
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
      {endResult && <p>{endResult}</p>}
      {(win || draw) && (
        <button
          onClick={() => {
            setBoardState(null!);
            setWin(null!);
            setDraw(null!);
            setEndResult(null!);
          }}
        >
          Reset board?
        </button>
      )}
    </div>
  );
}

export default App;
