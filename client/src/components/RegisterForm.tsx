import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom'
import { Grid, TextField, Button, Select, MenuItem } from '@material-ui/core'

export interface IFormData {
  username: string
  password: string
  role: string
}

export interface IProps {
  onSubmit: (data: IFormData) => void
}


const RegisterForm: React.FC<IProps> = (props: IProps) =>  {
    const [username,setUserName] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [role,setRole] = useState<string>('');
    const [confirmPassword,setConfirmPassword] = useState<string>('');
    const [usernameError,setUserNameError] = useState<string>('');
    const [passwordError,setPasswordError] = useState<string>('');
    const [confirmPasswordError,setConfirmPasswordError] = useState<string>('');
  
    const clearError = () => {
      setUserNameError('');
        setPasswordError('');
        setConfirmPasswordError('');
    }
    const onSubmitHandler = () => {

      clearError()
  
      if (!username) {
        setUserNameError('Username can not be empty');
        return;
      }
  
      if (!password) {
        
        setPasswordError('Password can not be empty');
        return;
      }
  
      if (confirmPassword !== password) {
          setConfirmPasswordError('Two passwords do not match')
          return;
      }
  
      if (
        window.confirm(`Are you sure you want to create a new ${role} account?`)
      ) {
        props.onSubmit({
          username,
          password,
          role,
        })
      }
    }
  
    
    return (
      <Grid
        container
        spacing={4}
        direction="column"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Username"
            value={username}
            error={!!usernameError}
            helperText={usernameError}
            onChange={e => setUserName(e.target.value )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Password"
            value={password}
            type="password"
            error={!!passwordError}
            helperText={passwordError}
            onChange={e => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Confirm Password"
            value={confirmPassword}
            type="password"
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Select
            value={role}
            placeholder="Role"
            onChange={e => {
              setRole(e.target.value as string);
            }}
          >
            <MenuItem value="Citizen">Citizen</MenuItem>
            <MenuItem value="Dispatch">Dispatch</MenuItem>
            <MenuItem value="Police">Police</MenuItem>
            <MenuItem value="Fire">Fire</MenuItem>
            <MenuItem value="Nurse">Nurse</MenuItem>
            <MenuItem value="Administrator">Administrator</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={e => {
              e.preventDefault()

              onSubmitHandler()
            }}
            fullWidth
          >
            Register
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth>
            <Link to="/login">Login</Link>
          </Button>
        </Grid>
      </Grid>
    )
  }

  

export default RegisterForm
