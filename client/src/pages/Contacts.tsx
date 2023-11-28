import React, { useState, useEffect } from 'react'
// import { RouteComponentProps } from 'react-router'
import ContactList, { ClickContactHandler } from '../components/ContactList'
import request from '../utils/request'
import IUser from '../models/User'
import IChannel from '../models/Channel'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Grid } from '@material-ui/core'
import NavigationBar from '../components/NavigationBar'
import TabBar from '../components/TabBar'


const Contacts :React.FC  = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const onClick: ClickContactHandler = async userId => {
    const channel = (await request('/api/channels', {
      method: 'POST',
      body: JSON.stringify({ users: [userId, localStorage.getItem('uid')] }),
    })) as IChannel

    const userOnOtherEnd = channel.users.filter(u => u._id==userId);
    const name = userOnOtherEnd[0].username;

    navigate(`/messages/${channel._id}?name=${name}`)
  }

useEffect(() => {
  const tkn = localStorage.getItem('token');
    if(tkn==null || tkn==""){
      navigate('/login');
    }
  const getUsers = async() => {
    const currentUserId = localStorage.getItem('uid')
    let users = (await request('/api/users')) as IUser[]

    // do not show the current user
    users = users.filter(user => user._id !== currentUserId);
    setUsers(users);
    setLoading(false);
  }
  getUsers();
}, [])

    return (
      <div>
        <Grid container direction="column">
        <Grid item>
          <AppBar position="static">
            <NavigationBar title="Contacts" showMenu={true} />
            <TabBar
              currentTab={useLocation().pathname}
              onChange={(route) => {
                navigate(route);
              }}
            />
          </AppBar>
        </Grid>
        </Grid>
    <ContactList users={users} loading={loading} onClick={(user) => onClick(user)} />
    </div>);
  }

export default Contacts
