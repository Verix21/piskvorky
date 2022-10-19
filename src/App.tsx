/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";

type Value = "x" | "o" | null;

function App() {
  const [boardState, setBoardState] = useState<Value[][]>();
  const [playerSwitch, setPlayerSwitch] = useState<boolean>(false);
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

  const winCondition = () => {
    let diagonalA: Value[] = [];
    let diagonalB: Value[] = [];
    // let diagonalsA: Array<Value[]> = [];
    // let diagonalsB: Array<Value[]> = [];
    // // for (let i = 0; i < boardState.length; i++) {
    // //   diagonalsA.push([]);
    // //   for (let j = 0; j <= i; j++) {
    // //     let k = i - j;
    // //     diagonalsA[i]!.push(boardState[k][j]);
    // //     console.log("diagTest", diagonalsA);
    // //   }
    // // }
    // // for (let i = boardState.length - 2; i >= 0; i--) {
    // //   diagonalsB.push([]);
    // //   for (let j = 0; j <= i; j++) {
    // //     let k = i - j;
    // //     diagonalsB[diagonalsB.length - 1]!.push(
    // //       boardState[boardSize - j - 1][boardSize - k - 1]
    // //     );
    // //     console.log("diagTest", diagonalsB);
    // //   }
    // // }
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

  const checkRows = () => {};

  const checkCollumns = () => {};

  const checkDiagonals = () => {};

  const drawCondition = () => {
    let drawCheck = boardState!.map((row) => row.includes(null));
    if (!drawCheck.includes(true)) {
      setDraw(true);
    }
  };

  useEffect(() => {
    if (win && playerSwitch) setEndResult("Player 1 (x) won!");
    if (win && !playerSwitch) setEndResult("Player 2 (o) won!");
    if (!win && draw) setEndResult("It's a draw!!");
  }, [win, draw]);

  const onClick = (cellValue: Value, rowIndex: number, cellIndex: number) => {
    let boardCopy = [...boardState!];
    if (!cellValue && !playerSwitch && !win) {
      boardCopy[rowIndex][cellIndex] = "x";
      setBoardState(boardCopy);
      setPlayerSwitch(!playerSwitch);
      winCondition();
      drawCondition();
    }
    if (!cellValue && playerSwitch && !win) {
      boardCopy[rowIndex][cellIndex] = "o";
      setBoardState(boardCopy);
      setPlayerSwitch(!playerSwitch);
      winCondition();
      drawCondition();
    }
  };

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
            setBoardState(null!);
            setWin(null!);
            setDraw(null!);
            setEndResult(null!);
            setPlayerSwitch(false);
          }}
        >
          Reset board?
        </button>
      )}
    </div>
  );
}

export default App;
