import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Grid, TextField, Button } from '@material-ui/core'

export interface IFormData {
  username: string
  password: string
}

export interface IProps {
  login: (data: IFormData) => void
}

interface IState extends IFormData {
  usernameError: string
  passwordError: string
}

class RegisterForm extends Component<IProps, IState> {
  state: IState = {
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
  }

  render() {
    const { username, password, usernameError, passwordError } = this.state

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
            onChange={e => this.setState({ username: e.target.value })}
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
            onChange={e => this.setState({ password: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={e => {
              e.preventDefault()

              this.onSubmit()
            }}
            fullWidth
          >
            Login
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth>
            <Link to="/register">Register</Link>
          </Button>
        </Grid>
      </Grid>
    )
  }

  private onSubmit = () => {
    const { username, password } = this.state

    this.clearError()

    if (!username) {
      this.setState({
        usernameError: 'Username can not be empty',
      })

      return
    }

    if (!password) {
      this.setState({
        passwordError: 'Password can not be empty',
      })

      return
    }

    this.props.login({
      username,
      password,
    })
  }

  private clearError = () => {
    this.setState({
      usernameError: '',
      passwordError: '',
    })
  }
}

export default RegisterForm
