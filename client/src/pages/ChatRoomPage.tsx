import React, { Component, useEffect, useState } from 'react'
import moment from 'moment'
import { AppBar, Grid } from '@material-ui/core'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import NavigationBar from '../components/NavigationBar'
import IMessage from '../models/Message'
import IChannel from '../models/Channel'
import request from '../utils/request'
import DataStore, { DataStoreChangeHandler } from '../utils/DataStore'

import styles from '../styles/ChatRoomPage.module.css'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'


const ChatRoomPage: React.FC = () => {

  const channelId = useLocation().pathname.split('/')[2];
  const [searchParams] = useSearchParams();
  const fromName = searchParams.get('name');

  const history = useNavigate();
  const [ msgs, setMsgs ] = useState<IMessage[]>([]);
  const [ isLoading, setLoading ] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const tkn = localStorage.getItem('token');
    if(tkn==null || tkn==""){
      navigate('/login');
      return;
    }

    const d = async() => {
      const channels = await request('/api/channels') as IChannel[];
      const publicChannel = channels.filter(
        channel => channel.name === 'Public'
      )[0];
      history(`/messages/${publicChannel._id}`)
    }
        // `/public` is just a shorthand.
    // redirect `/public` to `/{public channel id}`.
    if (channelId === 'public') {
      d();
    
      

      // NOTE: At this moment, ChatRoomPage has been mounted.
      // A redirect will not trigger another `componentDidMount`.
    }
    DataStore.addListener(onGlobalDataStoreChange)

    loadChatHistory(channelId);
    setLoading(false);
    return () => {
          DataStore.removeListener(onGlobalDataStoreChange)

    }
  }, []);


    const setMessages = (messages: IMessage[]) => setMsgs([ ...messages ])
    const onGlobalDataStoreChange: DataStoreChangeHandler = newState => {
      const rawMessages = newState.messages.get(channelId) || []
      const messages = rawMessages.map(parseMessage)
      setMessages(messages)
    }

    return (
      
      <Grid className={styles.root} container direction="column">
        <Grid item>
          <AppBar position="static">
            <NavigationBar
              title={`${fromName || ''} messages`}
              showBackButton
              onBack={() => {
                history('/messages')
              }}
            />
          </AppBar>
        </Grid>

        <Grid className={styles.list} item>
          <MessageList
            messages={msgs || []}
            loading={isLoading}
          />
        </Grid>

        <Grid className={styles.input} item>
          <MessageInput onSubmit={(content:string) => sendMessage(content, channelId)} />
        </Grid>
      </Grid>
    )
  }


  const sendMessage = async (content: string, channelId: string) => {
    const message = await request(`/api/channels/${channelId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        content,
      }),
    })

    // update global store.
    const messages = DataStore.getState().messages
    messages.get(channelId)!.push(message)
    DataStore.setState({ messages })
  }

  const parseMessage: (rawMessage: IMessage) => IMessage = ({
    timestamp,
    ...rest
  }: IMessage) => {
    return {
      timestamp: moment(timestamp).calendar(),
      ...rest,
    }
  }

  const loadChatHistory = async (channelId:string) => {
    // TODO: add latestMessageId and limit
    const rawMessages = await request(
      `/api/channels/${channelId}/messages`
    )

    const messages = DataStore.getState().messages

    messages.set(channelId, rawMessages)
    // update global data store, then onGlobalDataStoreChange will be called.
    DataStore.setState({ messages })
  }

export default ChatRoomPage
