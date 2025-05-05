import React from 'react'

type CellProps = {
  value: number
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  isExploded: boolean
  onCellClick: () => void
}

export const Cell = ({ value, isMine, isRevealed, isFlagged, isExploded, onCellClick }: CellProps) => {
  return (
    <div 
      className={`w-8 h-8 border border-gray-400 flex items-center justify-center cursor-pointer
        ${isFlagged ? 'bg-gray-200' : ''}
        ${isRevealed ? 'bg-gray-200' : 'bg-white hover:bg-gray-100'}
        ${isExploded ? 'bg-red-500' : ''}`}
      onClick={onCellClick}>
      {isRevealed && (isMine ? "💣" : value > 0 ? value : "")}
    </div>
  )
}
