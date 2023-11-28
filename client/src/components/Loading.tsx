import React, { FunctionComponent, Fragment } from 'react'
import { Skeleton } from '@material-ui/lab'

// interface ILoadingProps {}

const Loading: FunctionComponent = () => (
  <Fragment>
    <Skeleton style={{ marginTop: 10 }} />
    <Skeleton animation={false} />
    <Skeleton animation="wave" />
  </Fragment>
)

export default Loading
