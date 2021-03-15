import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Content from './Content'
import DragHandle from 'components/core/DragHandle'
import { useRepo } from 'store/selectors'

const INITIAL_WIDTH = 350
const HANDLE_WIDTH = 6

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  },
  content: {
    width: ({ width }) => width - HANDLE_WIDTH / 2,
  },
}))

const Sidebar = () => {
  const [width, setWidth] = useState(INITIAL_WIDTH)
  const classes = useStyles({ width })
  const repo = useRepo()

  if (!repo) return null
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Content />
      </div>
      <DragHandle onDrag={setWidth} width={HANDLE_WIDTH} />
    </div>
  )
}

export default Sidebar
