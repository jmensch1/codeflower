import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    cursor: 'pointer',
    padding: '4px 0',
  },
  label: {
    fontSize: '1.0em',
    fontWeight: 'bold',
  },
  toggle: {
    display: 'flex',
    color: theme.palette.text.disabled,
  },
  content: {
    '& > *': {
      marginTop: 10,
    }
  },
}))

const ControlGroup = ({ label, children }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles({ open })

  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, { isOpen: open })
  })

  return (
    <div className={classes.root}>
      <div className={classes.header} onClick={() => setOpen(!open)}>
        <div className={classes.label}>
          { label }
        </div>
        <div className={classes.toggle}>
          { open ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
        </div>
      </div>
      <div className={classes.content}>
        { childrenWithProps }
      </div>
    </div>
  )
}

export default ControlGroup
