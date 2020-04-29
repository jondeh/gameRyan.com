import React, {useState, useEffect} from 'react';
import Square from '../Square/Square';
import axios from 'axios';
import './Grid.scss';
import UseInput from '../../Hooks/UseInput';
import SolveSudoku2 from '../../Hooks/SolveSudoku2';
import ValidateSudoku2 from '../../Hooks/ValidateSudoku2';
import Timer from '../Timer/Timer';
import {RiTimer2Line} from 'react-icons/ri'

const Grid = (props) => {

    const [grid, setGrid] = useState([[0],[0],[0],[0],[0],[0],[0],[0],[0]]);
    const [isSolved, setIsSolved] = useState(null)
    const [difficulty, setDifficulty] = useState('Difficulty')
    const [id, setId] = useState('0')
    const [attempt, setAttempt] = useState([0],[0],[0],[0],[0],[0],[0],[0],[0])
    const [play, setPlay] = useState(false)
    const [easy, setEasy] = useState(false)
    const [medium, setMedium] = useState(false)
    const [hard, setHard] = useState(false)

    const handleInput = (x, y, e) => {
        console.log("DING", x, y, e)
        console.log("YX", grid[y][x])
        let newGrid = grid.slice()
        newGrid[y][x] = e
        let one = [...newGrid[0]]
        let two = [...newGrid[1]]
        let three = [...newGrid[2]]
        let four = [...newGrid[3]]
        let five = [...newGrid[4]]
        let six = [...newGrid[5]]
        let seven = [...newGrid[6]]
        let eight = [...newGrid[7]]
        let nine = [...newGrid[8]]
        let newArr = [one, two, three, four, five, six, seven , eight, nine]
        setAttempt(newArr)
        console.log("griddy", grid)
    }

    useEffect(() => {
        if(play === true){
            axios.get(`/api/puzzles${difficulty}`)
            .then(res => {
                const {id, difficulty, newNumbers} = res.data
                // setDifficulty(difficulty)
                setId(id)
                setGrid(newNumbers)
                setAttempt(newNumbers)

            })
        } else{setGrid(grid.map((e,i) => ['0', '0', '0', '0', '0', '0', '0', '0', '0']))}
    }, [difficulty])

    useEffect(() => {
        if(difficulty === 'easy' && easy !== 'easy'){
            setEasy(true)
            setMedium(false)
            setHard(false)
        }
        if(difficulty === 'medium' && medium !== 'medium'){
            setMedium(true)
            setEasy(false)
            setHard(false)
        }
        if(difficulty === 'hard' && hard !== 'hard'){
            setHard(true)
            setEasy(false)
            setMedium(false)
        }
    }, [difficulty])


    // <---------- Need to fix so it axios calls the right difficulty and updates appropriately.

    const handleClick = (bool, diff) => {
        setPlay(false)
        // console.log(play)
        setDifficulty(diff)
        setPlay(true)
    }

    const handleSolve = () => {
        let answer = SolveSudoku2(grid)
        setGrid(answer)
    }

    const handleSubmit = () => {
        // console.log("grid1", grid)
        // console.log("attempt", attempt)
        let solved = ValidateSudoku2(grid)
        console.log(solved)
        if(solved){alert("SOLVED")}
        if(!solved){
            return alert("NOT SOLVED")
            // let answer = SolveSudoku2(grid)
            
        } 
    }
    
    console.log(grid)
    let mappedGrid = grid.map((e,i) => {
        return <div key={i} className="indexY">
            {e.map((ele, ind) => <Square indexY={i} indexX={ind} key={ind} number={ele} handleInput={handleInput} />)}
        </div>
    })

    return (
        <div className="body">
            <div className="difficulty-container">
    {/* <div className="difficulty">{difficulty.toUpperCase()} {id}</div> */}
                <button className={`easy-${easy.toString()}`} onClick={() => handleClick(true, 'easy')} >EASY</button>
                <button className={`medium-${medium.toString()}`} onClick={() => handleClick(true, 'medium')} >MEDIUM</button>
                <button className={`hard-${hard.toString()}`} onClick={() => handleClick(true, 'hard')} >HARD</button>
            </div>
        <div className="grid-container">
        <div className="timer-container">
            {
                play === true ? <Timer play={play} difficulty={difficulty} /> : <RiTimer2Line size={40} onClick={() => setPlay(true)}/>
            }
        </div>
        <div className="grid">
                {mappedGrid}
        </div>
        </div>
        <div className="button-container">
            <button onClick={() => handleSubmit()} className="submit">SUBMIT</button>
            <button onClick={() => handleSolve()} className="solve">SOLVE</button>
        </div>
        </div>
    )
}

export default Grid;