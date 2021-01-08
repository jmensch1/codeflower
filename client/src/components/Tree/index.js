import React from 'react'
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
    height: '100vh',
    width: ({ isOpen }) => isOpen ? WIDTH : 0,
    backgroundColor: 'black',
    transition: 'all 0.35s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    //backgroundColor: theme.palette.background.default,
  },
  inner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: ({ isOpen }) => isOpen ? 0 : -WIDTH,
    transition: 'all 0.35s ease-in-out',
    width: WIDTH,
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5em',
    borderBottom: '0.5px white dotted',
  },
}))

const Tree = () => {
  const { isOpen } = useModal('tree')
  const classes = useStyles({ isOpen })
  const dispatch = useDispatch()

  const close = () => {
    dispatch(closeModal('tree'))
  }

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
        <Content />
      </div>
    </div>
  )
}

export default Tree
