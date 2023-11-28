import request from '../utils/request'
import React, { Component, useEffect, useState } from 'react'
import ChannelList from '../components/ChannelList'
import IChannel, { resolveChannelName } from '../models/Channel'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Grid } from '@material-ui/core'
import NavigationBar from '../components/NavigationBar'
import TabBar from '../components/TabBar'

interface IState {
  channels?: IChannel[]
}

const Messages: React.FC = () =>  {
const [channels, setChannels] = useState<IChannel[]>([]);
const [loading, setLoading] = useState<boolean>(true);
const navigate = useNavigate();
  useEffect(() => {
    const tkn = localStorage.getItem('token');
    if(tkn==null || tkn==""){
      navigate('/login');
      return;
    }
    const uid = localStorage.getItem('uid');
    const getCs = async() => {
      const channels = (await request(`/api/channels?user=${uid}`)) as IChannel[];
      setChannels(channels.map(resolveChannelName));
      setLoading(false);
    }
    getCs();

  }, [])
    return (
        <div>
          <Grid container direction="column">
          <Grid item>
            <AppBar position="static">
              <NavigationBar title="Messages" showMenu={true} />
              <TabBar
                currentTab={useLocation().pathname}
                onChange={(route) => {
                  navigate(route);
                }}
              />
            </AppBar>
          </Grid>
          </Grid>
      
    <ChannelList channels={channels} loading={loading}/>
    </div>)
  }

export default Messages
