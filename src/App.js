import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
// import { AppBar, Button, IconButton, Toolbar, Typography, makeStyles, Menu, MenuItem } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import Tracker from './Components/LiveTracker/Tracker';
import ChatRoom from './Components/Chat/ChatRoom';
import NavBar from './Components/Navgation/NavBar';



function App() 
{
  return (
    <div>          
      <BrowserRouter>  
        <NavBar/>      
        <Switch>
          <Route exact path='/tracker' component={Tracker}/>   
          <Route exact path='/chatroom' component={ChatRoom}/>                   
        </Switch>
      </BrowserRouter>      
    </div>
  )
}

export default App
