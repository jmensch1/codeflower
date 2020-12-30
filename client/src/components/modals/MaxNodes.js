import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/modals'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import TextButton from 'components/core/TextButton'
// import { Zoom } from 'components/Transitions'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      padding: 20,
    },
    '& .MuiTypography-root': {
      maxWidth: 400,
      marginBottom: 15,
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    margin: '0 10px',
  },
}))

const MaxNodes = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    isOpen,
    params: { totalNodes, onRenderAll, onRenderSub }
  } = useModal('maxNodes')

  if (!isOpen) return null

  const renderAll = () => {
    onRenderAll()
    dispatch(closeModal('maxNodes'))
  }

  const renderSub = () => {
    onRenderSub()
    dispatch(closeModal('maxNodes'))
  }

  return (
    <Dialog
      className={classes.root}
      open={isOpen}
      // TransitionComponent={Zoom}
    >
      <Typography>
        This repo contains { totalNodes } files and folders.
        Rendering the whole thing might crash your browser.
        What do you want to do?
      </Typography>
      <div className={classes.buttons}>
        <TextButton
          label='Go for it!'
          onClick={renderAll}
          className={classes.button}
        />
        <TextButton
          label='Render a subfolder'
          onClick={renderSub}
          className={classes.button}
        />
      </div>
    </Dialog>
  )
}

export default MaxNodes
