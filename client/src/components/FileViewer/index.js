import React from 'react'
import { useFiles } from 'store/selectors'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  root: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    height: 600,
    width: 400,
    border: '1px black solid',
    padding: 10,
    zIndex: 1,
    overflow: 'auto',
    backgroundColor: 'white',
    '& pre': {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      fontSize: 12,
    }
  }
})

const FileViewer = () => {
  const classes = useStyles()
  const { files, selectedFile }= useFiles()
  const file = selectedFile ? files[selectedFile] : null

  if (!file) return null
  return (
    <div className={classes.root}>
      <pre><code>{ file }</code></pre>
    </div>
  )
}

export default FileViewer
