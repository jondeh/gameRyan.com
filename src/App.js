import React from 'react';
import './App.scss';
import Grid from './Components/Grid/Grid';
import routes from './routes';
import Header from './Components/Header/Header';
import {withRouter} from 'react-router-dom';
import Header2 from './Components/Header/Header2';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="app-body">
      <Header2 />
      {routes}
      </div>
    </div>
  );
}

export default withRouter(App);
