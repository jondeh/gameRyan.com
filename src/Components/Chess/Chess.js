import React, {useState, useEffect} from 'react';
import './Chess.scss';
import Tile from './Tile'

const Chess = (props) => {

    // let k = {
    //     pieceType: 'King',
    //     isSelected: false,
    //     possibleMoves: [],
    // }

    const [board, setTile] = useState({
        startBoard: "RHBKQBHRPPPPPPPPXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXpppppppprhbkqbhr4"
    })
    const [currentBoard, setCurrentBoard] = useState([
        ['R', 'H', 'B', 'K', 'Q', 'B', 'H', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['r', 'h', 'b', 'k', 'q', 'b', 'h', 'r']
        // [{}, {}, {}, {}, {}, {}, {}, {}]
    ])

    const handleSelect = () => {
        console.log("ding")
    }

    // let newMappedBoard = currentBoard.map((e,i) => e.map((f,j) => {
    //     return 
    // })
    // })

    let counter = false
    let mappedBoard = board.startBoard.split('').map((e,i) => {
    let index = i
    let bishopMoves = [[i-9, i-18, i-27, i-36, i-45, i-54, i-63], [i-7, i-14, -21, i-28, i-35, i-42, i-49], [i+7, i+14, i+21, i+28, i+35, i+42, i+49], [i+9, i+18, i+27, i+36, i+45, i+54, i+63]]
    if(index % 8 === 0){counter = !counter}
        return <Tile key={i} index={i} piece={e} backgroundColor={counter} bishopMoves={bishopMoves} handleSelect={handleSelect} name={e} />
    })

    return (
        <div className="chess-container">
            <div className="chess-board">
                {mappedBoard}
            </div>
        </div>
    )
}

export default Chess;