import React, { useState } from "react"
import { DEFAULT_SNAKE, DEFAULT_BOUNDS } from "../constants/constants"
import { BoardTile, getFoodSpot, render } from "../game/game"
import styles from "../styles/Home.module.css"

export const Board = (): JSX.Element | null => {
  const [board] = useState<BoardTile[][] | undefined>(
    render(
      DEFAULT_SNAKE,
      DEFAULT_BOUNDS,
      getFoodSpot(DEFAULT_BOUNDS, DEFAULT_SNAKE)
    )
  )
  
  return board ? (
    <div>
      {board.map((row, rowIndex) => {
        return (
          <div className={styles.row}>
            {row.map((col, colIndex) => {
              return (
                <div className={styles.square} key={`${rowIndex},${colIndex}`}>
                  <div className={styles[col]}>
                    {rowIndex}, {colIndex}
                    <div style={{ fontSize: "18px" }}>{col}</div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  ) : null
}
