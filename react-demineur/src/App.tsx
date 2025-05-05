import { useEffect, useState } from "react"
import { Game } from "./Game"
import { Cell } from "./components/Cell"

function App() {
  const [game, setGame] = useState<Game | null>(null)
  const [grid, setGrid] = useState<any[][]>([])

  useEffect(() => {
    const newGame = new Game()
    setGame(newGame)
    setGrid([...newGame.getGrid()])
  }, [])

  const handleNewGame = () => {
    if (!game) return

    game.newGame()
    setGrid([...game.getGrid()]) 
  }

  if (!game) {
    return <div>Chargement...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200 p-4">
      <h1 className="text-3xl font-bold underline mb-6">Démineur v0.1</h1>
      
      {game.grid.length > 0 && (
        <div className="grid grid-cols-10 gap-1 bg-gray-300 p-2">
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell key={`${rowIndex}-${colIndex}`} value={cell.aroundMinesCount} isMine={cell.isMine} isRevealed={cell.isRevealed} isFlagged={cell.isFlagged} isExploded={cell.isExploded} onCellClick={() => {
                game.revealCell(rowIndex, colIndex)
                setGrid([...game.getGrid()])
              }} />
            ))
          )}
        </div>
      )}
      <button
        onClick={handleNewGame}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
      >
        Nouvelle partie
      </button>
    </div>
  )
}

export default App
