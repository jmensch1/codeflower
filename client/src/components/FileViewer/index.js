import React from 'react'
import { useDispatch } from 'react-redux'
import { useFiles } from 'store/selectors'
import { closeFile } from 'store/files'
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {

    '& pre': {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      fontSize: 12,
    },
    '& .MuiDialog-paper': {
      boxShadow: 'none'
    },
  }

}))

const FileViewer = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { files, selectedFile } = useFiles()
  const file = selectedFile ? files[selectedFile] : null

  const handleClose = () => dispatch(closeFile())

  if (!file) return null
  return (
    <Dialog
      className={classes.root}
      onClose={handleClose}
      open={!!file}
      fullWidth
    >
      <DialogTitle onClose={handleClose}>
        { selectedFile }
      </DialogTitle>
      <DialogContent dividers>
        <pre><code>{ file }</code></pre>
      </DialogContent>
    </Dialog>
  )
}

export default FileViewer
