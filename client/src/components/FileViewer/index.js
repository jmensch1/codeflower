import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useFiles } from 'store/selectors'
import { closeFile } from 'store/files'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      minHeight: 'calc(100% - 64px)',
      width: 800,
      maxWidth: 'calc(100% - 64px)',
      boxShadow: 'none',
    },
    '& .MuiDialogContent-root': {
      position: 'relative',
    },
  },
  progress: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  header: {
    textAlign: 'center',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontStyle: 'italic',
  },
  code: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontSize: '1rem',
  }
}))

const FileViewer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { files, selectedFile, isLoading, error } = useFiles()

  const handleClose = useCallback(() => {
    dispatch(closeFile())
  }, [dispatch])

  if (!selectedFile) return null
  const file = files[selectedFile.path]
  return (
    <Dialog
      className={classes.root}
      onClose={handleClose}
      open={!!file || !!error || isLoading}
      fullWidth
    >
      <DialogTitle className={classes.header}>
        <Typography className={classes.name} variant='h6' component='div'>
          { selectedFile.data.name }
        </Typography>
        <Typography className={classes.meta} variant='body2' component='div'>
          { selectedFile.data.size } lines of { selectedFile.data.language }
        </Typography>
        <Typography className={classes.meta} variant='body2' component='div'>
          { selectedFile.path.split('/').join(' • ') }
        </Typography>
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {
          isLoading
          ? (
            <div className={classes.progress}>
              <CircularProgress color='inherit' />
            </div>
          )
          : (
            <pre className={classes.code}>
              <code>
                { file || (error && error.message) }
              </code>
            </pre>
          )
        }
      </DialogContent>
    </Dialog>
  )
}

export default FileViewer
