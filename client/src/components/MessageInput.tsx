import React, { Component, MouseEvent, ChangeEvent } from 'react'
import cx from 'classnames'
import { TextField, Button, Container } from '@material-ui/core'

import styles from '../styles/MessageInput.module.css'

interface IProps {
  className?: string
  onSubmit: (text: string) => void
}

interface IState {
  content: string
}

class MessageInput extends Component<IProps, IState> {
  state: IState = {
    content: '',
  }

  render() {
    const { className } = this.props
    const { content } = this.state

    return (
      <form>
        <Container className={cx(className, styles.root)}>
          <TextField
            className={styles.input}
            placeholder="Write a message here..."
            value={content}
            onChange={this.onChange}
          />
          <Button
            variant={!content ? 'text' : 'contained'}
            color="primary"
            type="submit"
            onClick={this.onSubmit}
          >
            Send
          </Button>
        </Container>
      </form>
    )
  }

  private onChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      content: e.target.value,
    })
  }

  private onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { content } = this.state

    if (content) {
      this.props.onSubmit(content)

      this.setState({ content: '' })
    }
  }
}

export default MessageInput
