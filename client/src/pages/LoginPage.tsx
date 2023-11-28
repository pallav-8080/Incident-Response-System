import React, { Component } from 'react'
import { useNavigate } from 'react-router'
import { Typography, Grid } from '@material-ui/core'
import LoginForm, { IProps as ILoginFormProps } from '../components/LoginForm'
import request from '../utils/request'
import Socket from '../utils/Socket'

const LoginPage: React.FC = () => {
        const history = useNavigate();
        const login: ILoginFormProps['login'] = async ({ username, password }) => {
          try {
            const { token, _id, role } = (await request('/api/login', {
              method: 'POST',
              body: JSON.stringify({
                username,
                password,
              }),
            })) as {
              token: string
              _id: string
              role: string
            }
      
            localStorage.setItem('token', token)
            localStorage.setItem('uid', _id)
            localStorage.setItem('username', username)
            localStorage.setItem('role', role)
      
            Socket.connect()
      
            history('/');
          } catch ({ status, message }) {
            alert(`Error: ${message} (${status})`)
          }
        }
      
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography
            style={{
              margin: 32,
            }}
            color="primary"
            align="center"
            variant="h3"
            paragraph
          >
            Incident Response
          </Typography>
        </Grid>
        <Grid item>
          <LoginForm login={login} />
        </Grid>
      </Grid>
    )
  }
export default LoginPage
  