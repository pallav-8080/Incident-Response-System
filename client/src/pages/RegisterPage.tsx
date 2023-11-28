import React, { Component } from 'react'
import { useNavigate } from 'react-router'
import { Typography, Grid } from '@material-ui/core'
import RegisterForm, {
  IProps as IRegisterFormProps,
} from '../components/RegisterForm'
import request from '../utils/request'

const RegisterPage:React.FC = () => {
    let navigator = useNavigate();
    const onSubmit: IRegisterFormProps['onSubmit'] = async form => {
      try {
        await request('/api/users', {
          method: 'POST',
          body: JSON.stringify(form),
        })
  
        navigator('/login');
      } catch ({ status, message }) {
        window.alert(`Error: ${message} (${status})`)
      }
    };
    
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
            Register
          </Typography>
        </Grid>
        <Grid item>
          <RegisterForm onSubmit={onSubmit} />
        </Grid>
      </Grid>
    )
  }

  

  export default RegisterPage;
