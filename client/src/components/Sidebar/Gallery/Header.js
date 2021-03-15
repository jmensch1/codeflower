import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { closeModal } from 'store/actions/modals'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '1em',
    textAlign: 'center',
    borderBottom: `1px ${theme.palette.divider} solid`,
    position: 'relative',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.25em',
  },
  closeButton: {
    position: 'absolute',
    right: '1em',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.grey[500],
  },
}))

const Header = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const close = useCallback(() => {
    dispatch(closeModal('gallery'))
  }, [dispatch])

  return (
    <div className={classes.root}>
      <div className={classes.title}>Gallery</div>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={close}
        size="small"
      >
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default Header
