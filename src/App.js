import './App.css';
import { useState, useEffect } from "react";
import Square from './Components/Square';
import { Patterns } from './Components/Patterns';
function App() {
  const [Board, setBoard] = useState(["", "", "", "", "", "", "", "", ""])
  const [Player, setPlayer] = useState("O")
  const [Result, setResult] = useState({ winner: "none", state: "none" })

  useEffect(() => {
    checkWin();
    checkIfTie();

    if (Player === "X") {
      setPlayer("O");
    } else {
      setPlayer("X");
    }
  }, [Board])


  useEffect(() => {
    if (Result.state !== "none") {

      alert(`Game Finished! Winning player : ${Result.winner}`);
      resetartGame();
    }
  }, [Result])


  const chooseSquare = (square) => {
    setBoard(Board.map((value, index) => {
      if (value === "" && index === square) {
        return Player;
      }

      return value;
    }))
  }



  const checkWin = () => {
    Patterns.forEach((currentPattern) => {
      const firstPlayer = Board[currentPattern[0]];

      if (firstPlayer == "") return;
      let foundWinningPattern = true;

      currentPattern.forEach((index) => {
        if (Board[index] !== firstPlayer) {
          foundWinningPattern = false;
        }
      })
      if (foundWinningPattern) {
        setResult({ winner: Player, state: "won" });
      }
    })
  }

  const checkIfTie = () => {
    let filled = true;
    Board.forEach((square) => {
      if (square == "") {
        filled = false;
      }
    })
    if (filled) {
      setResult({ winner: "No One", state: "Tie" });
    }
  }

  const resetartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer("X");
  }

  return (
    <div className="App">
      <div className="board">
        <div className="row">
          <Square value={Board[0]} chooseSquare={() => { chooseSquare(0) }} />
          <Square value={Board[1]} chooseSquare={() => { chooseSquare(1) }} />
          <Square value={Board[2]} chooseSquare={() => { chooseSquare(2) }} />
        </div>
        <div className="row">
          <Square value={Board[3]} chooseSquare={() => { chooseSquare(3) }} />
          <Square value={Board[4]} chooseSquare={() => { chooseSquare(4) }} />
          <Square value={Board[5]} chooseSquare={() => { chooseSquare(5) }} />
        </div>
        <div className="row">
          <Square value={Board[6]} chooseSquare={() => { chooseSquare(6) }} />
          <Square value={Board[7]} chooseSquare={() => { chooseSquare(7) }} />
          <Square value={Board[8]} chooseSquare={() => { chooseSquare(8) }} />
        </div>
      </div>
    </div>
  );
}

export default App;
