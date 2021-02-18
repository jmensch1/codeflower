import React, { useEffect, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { useModal, useFiles } from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import { getFile } from 'store/actions/files'
import { makeStyles } from '@material-ui/core/styles'
import Modal from 'components/core/Modal'
import Header from './Header'
import Footer from './Footer'

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    overflow: 'hidden',
    margin: '0.5em',
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
      codeRef.current.innerHTML = file.content
    else if (error)
      codeRef.current.innerHTML = error.message
  }, [file, error])

  return (
    <Modal open={isOpen} onClose={close}>
      <Header onClose={close} metadata={metadata} filePath={filePath} />
      <div className={classes.content}>
        <pre
          className={clsx('hljs', classes.code)}
          style={{ padding: '1em', wordBreak: 'break-word', }} // override hljs
        >
          <code ref={codeRef} />
        </pre>
      </div>
      <Footer file={file} isLoading={isLoading} />
    </Modal>
  )
}

export default FileViewer
