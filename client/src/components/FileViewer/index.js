import React from 'react'
import { useDispatch } from 'react-redux'
import { useFiles } from 'store/selectors'
import { closeFile } from 'store/files'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, CircularProgress } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& pre': {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      fontSize: 12,
    },
    '& .MuiDialog-paper': {
      minHeight: 'calc(100% - 64px)',
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
  }
}))

const FileViewer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { files, selectedFile, isLoading, error } = useFiles()
  const file = selectedFile ? files[selectedFile] : null

  const handleClose = () => dispatch(closeFile())

  return (
    <Dialog
      classes={classes}
      onClose={handleClose}
      open={!!file || !!error || isLoading}
      fullWidth
    >
      <DialogTitle onClose={handleClose}>
        { selectedFile }
      </DialogTitle>
      <DialogContent dividers>
        {
          isLoading
          ? (
            <div className={classes.progress}>
              <CircularProgress color='text' />
            </div>
          )
          : <pre><code>{ file || error && error.message }</code></pre>
        }
      </DialogContent>
    </Dialog>
  )
}

export default FileViewer
