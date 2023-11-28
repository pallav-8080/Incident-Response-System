import React, { Component, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router'
import {useLocation} from "react-router-dom"
import { AppBar, Grid, Menu, MenuItem } from '@material-ui/core'
import NavigationBar, {
  IProps as INavigationBarProps,
} from '../components/NavigationBar'
import Home from '../components/Home'
import Contacts from './Contacts'
import Messages from './Messages';
import TabBar from '../components/TabBar'
import { useState } from 'react'

interface IState {
  openMenu: boolean
  menuAnchor?: HTMLElement
}

const HomePage: React.FC = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const tkn = localStorage.getItem('token');
    if(tkn==null || tkn==""){
      navigate('/login');
    }
  }, []);
  
 
  return (
      <div>
        <Grid container direction="column">
        <Grid item>
          <AppBar position="static">
            <NavigationBar title="Incident Response" showMenu={true} />
            <TabBar
              currentTab={useLocation().pathname}
              onChange={(route) => {
                navigate(route);
              }}
            />
          </AppBar>
        </Grid>
        <Grid item>
          <Routes>
            <Route  path="/" element={<Home/>} />
            <Route  path="/messages" element={<Messages/>} />
            <Route  path="/contacts" element={<Contacts/>} />
          </Routes>
        </Grid>
        
      </Grid>
      </div>
    );
  }



export default HomePage
