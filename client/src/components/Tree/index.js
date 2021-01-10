import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import { makeStyles } from '@material-ui/core/styles'
import Content from './Content'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'

const WIDTH = 250

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100vh',
    backgroundColor: 'black',
    width: ({ isOpen }) => isOpen ? WIDTH : 0,
    transition: 'width 0.35s ease-in-out',
  },
  inner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: ({ isOpen }) => isOpen ? 0 : -WIDTH,
    transition: 'left 0.35s ease-in-out',
    width: WIDTH,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5em',
    borderBottom: '0.5px white dotted',
  },
  content: {
    flex: 1,
    overflow: 'auto',
  },
}))

const Tree = () => {
  const { isOpen } = useModal('tree')
  const classes = useStyles({ isOpen })
  const dispatch = useDispatch()

  const close = useCallback(() => {
    dispatch(closeModal('tree'))
  }, [dispatch])

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.header}>
          <Typography variant='body2'>select folder</Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={close}
            size='small'
          >
            <ArrowBackIcon fontSize='small'/>
          </IconButton>
        </div>
        <div className={classes.content}>
          <Content />
        </div>
      </div>
    </div>
  )
}

export default Tree
