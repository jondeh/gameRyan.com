import {Switch, Route} from 'react-router-dom';
import React from 'react';
import Dashboard from './Components/Dashboard/Dashboard';
import Register from './Components/Register/Register';
import Grid from './Components/Grid/Grid';
import Chess from './Components/Chess/Chess';
import Tetris from './Components/Tetris/Tetris';

export default (
    <Switch>
        <Route exact path='/' component={Dashboard} />
        <Route path='/register' component={Register} />
        <Route path='/sudoku' component={Grid} />
        <Route path='/chess' component={Chess} />
        <Route path='/tetris' component={Tetris} />


    </Switch>
)