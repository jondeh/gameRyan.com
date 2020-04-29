import React from 'react';
import './Dashboard.scss';
import {Link, withRouter} from 'react-router-dom';

const Dashboard = (props) => {
    return (
        <div className="dashboard">
            <div className="sudoku" onClick={() => props.history.push('/sudoku') }><p>Sudoku</p></div>
            <div className="chess" onClick={() => props.history.push('/chess') }><p>Chess</p></div>
            <div className="tetris" onClick={() => props.history.push('/tetris') }><p>Tetris</p></div>
        </div>
    )
}

export default withRouter(Dashboard);