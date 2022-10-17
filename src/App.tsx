import React, { useEffect, useState } from "react";
import "./App.css";

type Value = "x" | "o" | null;

function App() {
  const [boardState, setBoardState] = useState<Value[][]>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [player, setPlayer] = useState<boolean>(false);
  const [win, setWin] = useState<boolean>(false);
  const [draw, setDraw] = useState<boolean>(false);
  let [moveCounter, setMovecounter] = useState<number>(0);

  // console.log(moveCounter, 'moves')

  const winCondition = () => {
    if (
      boardState[0][0] === "x" &&
      boardState[0][1] === "x" &&
      boardState[0][2] === "x"
    )
      setWin(true);
    if (
      boardState[0][0] === "o" &&
      boardState[0][1] === "o" &&
      boardState[0][2] === "o"
    )
      setWin(true);

    if (
      boardState[1][0] === "x" &&
      boardState[1][1] === "x" &&
      boardState[1][2] === "x"
    )
      setWin(true);
    if (
      boardState[1][0] === "o" &&
      boardState[1][1] === "o" &&
      boardState[1][2] === "o"
    )
      setWin(true);

    if (
      boardState[2][0] === "x" &&
      boardState[2][1] === "x" &&
      boardState[2][2] === "x"
    )
      setWin(true);
    if (
      boardState[2][0] === "o" &&
      boardState[2][1] === "o" &&
      boardState[2][2] === "o"
    )
      setWin(true);

    if (
      boardState[0][0] === "x" &&
      boardState[1][0] === "x" &&
      boardState[2][0] === "x"
    )
      setWin(true);
    if (
      boardState[0][0] === "o" &&
      boardState[1][0] === "o" &&
      boardState[2][0] === "o"
    )
      setWin(true);

    if (
      boardState[0][1] === "x" &&
      boardState[1][1] === "x" &&
      boardState[2][1] === "x"
    )
      setWin(true);
    if (
      boardState[0][1] === "o" &&
      boardState[1][1] === "o" &&
      boardState[2][1] === "o"
    )
      setWin(true);

    if (
      boardState[0][2] === "x" &&
      boardState[1][2] === "x" &&
      boardState[2][2] === "x"
    )
      setWin(true);
    if (
      boardState[0][2] === "o" &&
      boardState[1][2] === "o" &&
      boardState[2][2] === "o"
    )
      setWin(true);

    if (
      boardState[0][0] === "x" &&
      boardState[1][1] === "x" &&
      boardState[2][2] === "x"
    )
      setWin(true);
    if (
      boardState[0][2] === "x" &&
      boardState[1][1] === "x" &&
      boardState[2][0] === "x"
    )
      setWin(true);

    if (
      boardState[0][0] === "o" &&
      boardState[1][1] === "o" &&
      boardState[2][2] === "o"
    )
      setWin(true);
    if (
      boardState[0][2] === "o" &&
      boardState[1][1] === "o" &&
      boardState[2][0] === "o"
    )
      setWin(true);
  };

  const drawCondition = () => {
    setMovecounter(++moveCounter);
  };

  useEffect(() => {
    if (win && player) console.log("player 1 (x) won");
    if (win && !player) console.log("player 1 (o) won");
    if (moveCounter === 18) {
      setDraw(true);
      console.log("it's a draw!");
    }
  }, [win, moveCounter]);

  const onClick = (cellValue: Value, rowIndex: number, cellIndex: number) => {
    let boardCopy = [...boardState];
    if (!cellValue && !player) {
      boardCopy[rowIndex][cellIndex] = "x";
      setBoardState(boardCopy);
      setPlayer(!player);
      winCondition();
      drawCondition();
    }
    if (!cellValue && player) {
      boardCopy[rowIndex][cellIndex] = "o";
      setBoardState(boardCopy);
      setPlayer(!player);
      winCondition();
      drawCondition();
    }
  };

  return (
    <div className="App">
      {boardState.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cellValue, cellIndex) => (
            <th
              className="boardCell"
              key={cellIndex}
              onClick={() => onClick(cellValue, rowIndex, cellIndex)}
            >
              {cellValue}
            </th>
          ))}
        </tr>
      ))}
    </div>
  );
}

export default App;
