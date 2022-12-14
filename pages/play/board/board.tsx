import React, {useCallback} from 'react';
import GridSquare from "./grid-square";
import {FilledSquare, GridItem, Player} from "../../../core/types";

/*
create a `GridSquare` component that accepts an index and (optional) player renders it

✅ in the gridSquare parent
    create const for the grid size
    create const for the total number of squares
    create a filledSquares state that contains the grid items that should be filled in
        filledSquares is an object of { [index]: [Player] }
    create a function that accepts a grid item
        adds it to filled squares where:
             key = grid index
             value = player

✅ onclicked gridSquare parent will:
    receive the index of the grid item
    calc the column (calculated by index % boardSize)
    going backwards from grid`Items length,
        find the first item in the column that is not filled
            if not filled, add its index & current player to the filledSquares
    call togglePlayer

✅ render:
    for each grid item, render a gridSquare component
        pass in the index, and associated player from filledSquares

For players:
    ✅ create `Player` type and initialize with `name` and `color`
    ✅ create const for players
    ✅ create current player state and initialize with first player
    ✅ create toggle player function that toggles the current player
 */

const players: Player[] = [
    {
        name: 'player 1',
        color: '#2A52BE'
    },
    {
        name: 'player 2',
        color: '#68baba'
    }
]

const GRID_SIZE = 4
const TOTAL_SQUARES = GRID_SIZE * GRID_SIZE

const Board = () => {
    /*
   in the gridSquare parent
   ✅ create const for the grid size
   ✅ create const for the total number of squares
   ✅ create a filledSquares state that contains the grid items that should be filled in
       filledSquares is an object of { [index]: [Player] }
   ✅ create a function that accepts a grid item
       adds it to filled squares where:
            key = grid index
            value = grid item
    */

    const [filledSquares, setFilledSquares] = React.useState<FilledSquare>({})
    const [currentPlayer, setCurrentPlayer] = React.useState<Player>(players[0])

    const togglePlayer = () => setCurrentPlayer((prev) => prev === players[0] ? players[1] : players[0])

    const addFilledSquare = useCallback((square: GridItem) => {
        setFilledSquares({
            ...filledSquares,
            [square.position]: square
        })
    }, [filledSquares])

    /*
    onclicked gridSquare parent will:
        ✅ receive the index of the grid item
        ✅ calc the column (calculated by index % boardSize)
        ✅ going backwards from gridItems length,
            ✅ find the first item in the column that is not filled
               ✅ if not filled, add its index & current player to the filledSquares
        ✅ call togglePlayer
     */

    const onGridClick = useCallback((index: number) => {
        const column = index % GRID_SIZE
        const indexes = [...Array(TOTAL_SQUARES)]
            .map((_, i) => i)
            .filter((_, i) => i % GRID_SIZE === column)


        indexes.forEach((i) => {
            if (! filledSquares[i]) {
                addFilledSquare({
                    position: i,
                    onClick: onGridClick,
                    capturedBy: currentPlayer
                })
            }
        })

        togglePlayer()
    }, [addFilledSquare, currentPlayer, filledSquares])

    /*
    ✅ `render:
        for each grid item, render a gridSquare component
            pass in the index, and associated player from filledSquares
     */

    const gridItems = [...Array(TOTAL_SQUARES)].map((_, i) => {
        const data: GridItem = {
            position: i,
            onClick: onGridClick,
            capturedBy: filledSquares[i]?.capturedBy
        }

        return (
            <GridSquare
                key={i}
                {...data}
            />
        )
    })

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                    gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                    gridGap: '10px',
                }}
            >
                {gridItems}
            </div>
        </div>
    );
};

export default Board;
