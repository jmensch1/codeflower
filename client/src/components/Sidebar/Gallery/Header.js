import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { closeModal } from 'store/actions/modals'
import { restoreImage } from 'store/actions/gallery'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/ArrowBack'
import RestoreIcon from '@material-ui/icons/Restore'

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
    left: '0.5em',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.grey[500],
  },
  restoreButton: {
    position: 'absolute',
    right: '0.5em',
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.grey[500],
  },
}))

const Header = ({ image }) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const close = useCallback(() => {
    dispatch(closeModal('gallery'))
  }, [dispatch])

  const restore = useCallback(() => {
    dispatch(restoreImage(image.public_id))
    close()
  }, [dispatch, image, close])

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="close"
        className={classes.closeButton}
        onClick={close}
        size="small"
      >
        <CloseIcon />
      </IconButton>
      <div className={classes.title}>
        {image
          ? `${image.context.owner}/${image.context.name}`
          : 'No images'
        }
      </div>
      {image && (
        <IconButton
          aria-label="restore"
          className={classes.restoreButton}
          onClick={restore}
          size="small"
        >
          <RestoreIcon />
        </IconButton>
      )}
    </div>
  )
}

export default Header
