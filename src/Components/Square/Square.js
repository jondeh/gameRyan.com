import React, {useState, useEffect} from 'react';
import './Square.scss';

const Square = (props) => {
    const {indexX, indexY, number, handleInput} = props
    return (
        <div className="square-container">
            {
                typeof(number) == "string" && indexX % 3 === 0 ? 
                <div className="square3"><input name={indexX + ':' + indexY} className="square-input" onChange={(e) => handleInput(indexX, indexY, e.target.value)}></input></div> : 
                typeof(number) == "string"  && indexX % 3 !== 0 ? 
                <div className="square"><input name={indexX + ':' + indexY} className="square-input" onChange={(e) => handleInput(indexX, indexY, e.target.value)}></input></div> : 
                indexX % 3 === 0 ? 
                <div className="square3">{number}</div>  : 
                <div className="square">{number}</div>


                // number == 0 && indexX % 3 === 0 ? 
                // <div className="square3"><input name={indexX + ':' + indexY} className="square-input3" onChange={(e) => handleInput(indexX, indexY, e.target.value)}></input></div> : 
                // number == 0  && indexX % 3 !== 0 ? 
                // <div className="square"><input name={indexX + ':' + indexY} className="square-input" onChange={(e) => handleInput(indexX, indexY, e.target.value)}></input></div> : 
                // indexX % 3 === 0 ? 
                // <div className="square3">{number}</div>  : 
                // <div className="square">{number}</div>


                
            }
        </div>
    )
}

export default Square;