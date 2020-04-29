import React, {useState, useEffect} from 'react';
import {FaChessQueen} from 'react-icons/fa';
import {FaChessKing} from 'react-icons/fa';
import {FaChessKnight} from 'react-icons/fa';
import {FaChessPawn} from 'react-icons/fa';
import {FaChessBishop} from 'react-icons/fa';
import {FaChessRook} from 'react-icons/fa';

const Tile = (props) => {

    const [backGround, setBackGround] = useState("");

    const [isSelected, setIsSelected] = useState(false);
    const [indexX, setIndexX] = useState(0);
    const [index, setIndex] = useState(0);
    const [indexY, setIndexY] = useState(0);
    const [pieceType, setPieceType] = useState('');
    const [possibleMoves, setPossibleMoves] = useState(0);

    useEffect(() => {
        setBackGround(props.backgroundColor)
        setPieceType(piece => {
            return props.piece.toUpperCase()  === "K" ? "King" :
                props.piece.toUpperCase() === "Q" ? "Queen" :
                props.piece.toUpperCase()  === "B" ? "Bishop" :
                props.piece.toUpperCase()  === "H" ? "Knight":
                props.piece.toUpperCase()  === "R" ? "Rook" :
                props.piece.toUpperCase()  === "P" ? "Pawn" : null
        })
        setIndex(props.index)
        // console.log("pieceType", pieceType)
        // switch(pieceType){
        //     case "Knight":
        //         console.log("DINGDINGDING");
        //         break;
        //     default:
        //         console.log("DEFAULT")    
        // }
        
    }, [])

    useEffect(() => {
        setPossibleMoves(possibleMoves => {
            // console.log("ding1")
            switch(pieceType) {
                case 'Knight':
                    return possibleMoves = [index-17, index-15, index-10, index-6, index+6, index+10, index+15, index+17];
                case 'Bishop':

                    return possibleMoves = [props.bishopMoves]
            }
            
        })
    }, [pieceType])

    const handleSelect2 = () => {
        console.log("SELECT")
        setIsSelected(!isSelected)
        props.handleSelect()
    }
    
    // console.log(indexX, pieceType)
    console.log(possibleMoves)
    return (
        <div className={`tile-${backGround.toString()}-${isSelected.toString()}`} 
                onClick={handleSelect2}>
            {
                props.piece === "K" ? <FaChessKing size={38} color={"white"} border={"black"} /> :
                props.piece === "Q" ? <FaChessQueen  size={38}  color={"white"}  border={"black"} /> :
                props.piece === "B" ? <FaChessBishop  size={38}  color={"white"} /> :
                props.piece === "H" ? <FaChessKnight  size={38}  color={"white"} /> :
                props.piece === "R" ? <FaChessRook  size={38}  color={"white"} /> :
                props.piece === "P" ? <FaChessPawn  size={38}  color={"white"} /> : 
                props.piece === "k" ? <FaChessKing size={38} /> :
                props.piece === "q" ? <FaChessQueen  size={38} /> :
                props.piece === "b" ? <FaChessBishop  size={38} /> :
                props.piece === "h" ? <FaChessKnight  size={38} /> :
                props.piece === "r" ? <FaChessRook  size={38} /> :
                props.piece === "p" ? <FaChessPawn  size={38} /> : null
            }
        </div>
    )
}

export default Tile;