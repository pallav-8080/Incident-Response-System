import React, { FunctionComponent } from 'react'

import IMessage from '../models/Message'

import styles from '../styles/Message.module.css'

const Message: FunctionComponent<{
  message: IMessage
}> = ({
  message: {
    sender: { username },
    timestamp,
    content,
  },
}) => (
  <div className={styles.root}>
    <div>
      <span className={styles.name}>{username}</span>
      <span className={styles.timestamp}>{timestamp}</span>
    </div>
    <span className={styles.content}>{content}</span>
  </div>
)

export default Message
