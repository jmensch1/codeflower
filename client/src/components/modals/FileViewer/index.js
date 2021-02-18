import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useModal, useFiles } from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import { getFile } from 'store/actions/files'
import { makeStyles } from '@material-ui/core/styles'
import Modal from 'components/core/Modal'
import Header from './Header'
import CircularProgress from '@material-ui/core/CircularProgress'
import clsx from 'clsx'

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
  select: {
    display: 'inline-block',
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
    fontSize: 14,
    margin: 0,
    height: '100%',
    overflow: 'auto',
    padding: '1em',
  },
  progress: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

const FileViewer = () => {
  const {
    isOpen,
    params: { filePath, metadata },
  } = useModal('fileViewer')
  const classes = useStyles()
  const dispatch = useDispatch()
  const { files, isLoading, error } = useFiles()
  const codeRef = useRef(null)

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

  return (
    <Modal open={isOpen} onClose={close}>
      <Header onClose={close} metadata={metadata} />
      <div className={classes.content}>
        {isLoading ? (
          <div className={classes.progress}>
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <pre
            className={clsx('hljs', classes.code)}
            style={{ padding: '1em' }} // override hljs
          >
            <code ref={codeRef} />
          </pre>
        )}
      </div>
    </Modal>
  )
}

export default FileViewer
