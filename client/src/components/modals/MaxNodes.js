import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/modals'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
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
    '& .MuiButton-root': {
      margin: '0 10px',
    }
  },
  renderAllButton: {
    backgroundColor: theme.palette.warning.main,
  },
  renderSubButton: {
    backgroundColor: theme.palette.info.main,
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
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          className={classes.renderAllButton}
          variant='contained'
          onClick={renderAll}
        >
          Go for it!
        </Button>
        <Button
          className={classes.renderSubButton}
          variant='contained'
          onClick={renderSub}
        >
          Render a subfolder
        </Button>
      </Box>
    </Dialog>
  )
}

export default MaxNodes
