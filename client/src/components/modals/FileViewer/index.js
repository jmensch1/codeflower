import React, { useEffect, useCallback, useRef, useState } from 'react'
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
    height: '100%',
    position: 'relative',
    borderTop: `1px ${theme.palette.divider} solid`,
    borderBottom: `1px ${theme.palette.divider} solid`,
  },
  code: {
    whiteSpace: 'pre-wrap',
    fontSize: '1.2em',
    margin: 0,
    height: '100%',
    overflow: 'auto',
    padding: '1em',
  },
  modalContent: {
    opacity: ({ opacity }) => opacity,
  },
}))

const FileViewer = () => {
  const {
    isOpen,
    params: { filePath, metadata },
  } = useModal('fileViewer')
  const [opacity, setOpacity] = useState(0.95)
  const classes = useStyles({ opacity })
  const dispatch = useDispatch()
  const { files, isLoading, error } = useFiles()
  const preRef = useRef(null)
  const codeRef = useRef(null)

  const file = files[filePath]

  useEffect(() => {
    if (isOpen && !file) dispatch(getFile(filePath))
  }, [isOpen, file, filePath, dispatch])

  const close = useCallback(() => {
    dispatch(closeModal('fileViewer'))
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      if (file && preRef.current) preRef.current.scrollTop = 0

      if (file)
        codeRef.current.innerHTML = file.content
      else if (error)
        codeRef.current.innerHTML = error.message
    })
  }, [file, error])

  return (
    <Modal
      open={isOpen}
      onClose={close}
      classes={{ content: classes.modalContent }}
    >
      <Header onClose={close} metadata={metadata} filePath={filePath} />
      <div className={classes.content}>
        <pre
          ref={preRef}
          className={clsx('hljs', classes.code)}
          style={{
            padding: '1em',
            wordBreak: 'break-word',
          }} // override hljs
        >
          <code ref={codeRef} />
        </pre>
      </div>
      <Footer
        metadata={metadata}
        isLoading={!file || isLoading}
        opacity={opacity}
        setOpacity={setOpacity}
      />
    </Modal>
  )
}

export default FileViewer
