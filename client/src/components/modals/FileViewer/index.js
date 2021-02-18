import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal, useFiles } from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import { getFile } from 'store/actions/files'
import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Modal from 'components/core/Modal'
import Select from 'components/core/Select'

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    textAlign: 'center',
    borderBottom: `1px ${theme.palette.divider} solid`,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  meta: {
    fontStyle: 'italic',
  },
  content: {
    overflow: 'hidden',
    margin: '0.5em',
    backgroundColor: theme.palette.common.black,
    height: '100%',
    position: 'relative',
  },
  code: {
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    fontSize: 14,
    margin: 0,
    height: '100%',
    overflow: 'auto',
    padding: '1em',
    backgroundColor: theme.palette.common.black,
  },
  progress: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

const HIGHLIGHT_STYLES = [
  'solarized-dark',
  'solarized-light',
  'github',
]

const FileViewer = () => {
  const {
    isOpen,
    params: { filePath, metadata },
  } = useModal('fileViewer')
  const classes = useStyles()
  const dispatch = useDispatch()
  const { files, isLoading, error } = useFiles()
  const codeRef = useRef(null)
  const [highlightStyle, setHighlightStyle] = useState('github')
  const stylesheetRef = useRef(null)

  const file = files[filePath]

  useEffect(() => {
    if (isOpen && !file) dispatch(getFile(filePath))
  }, [isOpen, file, filePath, dispatch])

  const close = useCallback(() => {
    dispatch(closeModal('fileViewer'))
  }, [dispatch])

  useEffect(() => {
    if (file)
      codeRef.current.innerHTML = file
    else if (error)
      codeRef.current.innerHTML = error.message
  }, [file, error])

  useEffect(() => {
    console.log('adding stylesheet:', highlightStyle)
    const stylesheet = document.createElement('link')
    stylesheet.type = 'text/css'
    stylesheet.rel = 'stylesheet'
    stylesheet.href = `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/${highlightStyle}.min.css`
    document.head.appendChild(stylesheet)

    if (stylesheetRef.current) {
      stylesheetRef.current.disabled = true
      document.head.removeChild(stylesheetRef.current)
    }

    stylesheetRef.current = stylesheet
  }, [highlightStyle])

  if (!isOpen) return null

  return (
    <Modal open={isOpen} onClose={close}>
      <DialogTitle className={classes.header}>
        <Typography className={classes.name} variant="h6" component="div">
          {metadata.name}
        </Typography>
        {metadata.languageUnknown ? (
          <Typography className={classes.meta} variant="body2" component="div">
            Language unknown
          </Typography>
        ) : (
          <Typography className={classes.meta} variant="body2" component="div">
            {metadata.size} lines of {metadata.language}
          </Typography>
        )}
        <Select options={HIGHLIGHT_STYLES} value={highlightStyle} onChange={setHighlightStyle} />
        {/*<Typography className={classes.meta} variant="body2" component="div">
          {filePath.split('/').join(' • ')}
        </Typography>*/}
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={close}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div className={classes.content}>
        {isLoading ? (
          <div className={classes.progress}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <pre className={classes.code}>
            <code ref={codeRef} />
          </pre>
        )}
      </div>
    </Modal>
  )
}

export default FileViewer
