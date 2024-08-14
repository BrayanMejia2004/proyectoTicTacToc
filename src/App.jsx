import { useState } from "react"
import "./App.css"
import confetti from "canvas-confetti"
import { Square } from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./constants";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  //control del estado del board
  const [board, setBoard] = useState(Array(9).fill(null));

  //control del estado del turno
  const [turn, setTurn] = useState(TURNS.X);

  // null es que no hay ganador, false es que hay empate
  const [winner, setWinner] = useState(null);

  const checkWinner = (boarToCheck) => {

    //revisamos todas las combinaciones ganadoras para ver si x u o gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boarToCheck[a] &&
        boarToCheck[a] === boarToCheck[b] &&
        boarToCheck[a] === boarToCheck[c]
      ) {
        return boarToCheck[a];
      }
    }

    return null;
  }

  //reiniciar el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  //ver si hubo un empato o no
  const chechEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }


  //actualizar el board
  const updateBoard = (index) => {
    //no actualiza si ya tiene algo en esa posicion
    if (board[index] || winner) return

    //actualizar tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //revisar si hay un ganador o empate
    const newWinner = checkWinner(newBoard)
    if(newWinner) {
      confetti()
      setWinner(newWinner)

    } else if (chechEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className="board">
      <h1>Tic Tac Toc</h1>
      <section className="game">
        {board.map((square, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
            {square}
            </Square>
          )
        })}
      </section>

        {/*Visualizacion de los turnos X - O*/}
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>         
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>
  );
}

export default App;
