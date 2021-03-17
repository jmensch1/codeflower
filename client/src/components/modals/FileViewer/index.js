import React, { useEffect, useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import { useFiles } from 'store/selectors'
import { getFile, closeFile } from 'store/actions/files'
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
    overscrollBehavior: 'contain',
    padding: '1em',
  },
  modalContent: {
    opacity: ({ opacity }) => opacity,
    maxWidth: '100em',
  },
}))

const FileViewer = () => {
  const [opacity, setOpacity] = useState(0.95)
  const classes = useStyles({ opacity })
  const dispatch = useDispatch()
  const { files, openedFile, isLoading, error } = useFiles()
  const preRef = useRef(null)
  const codeRef = useRef(null)

  const file = openedFile ? files[openedFile.path] : null

  useEffect(() => {
    if (openedFile && !file) dispatch(getFile(openedFile.path))
  }, [openedFile, file, dispatch])

  const close = useCallback(() => dispatch(closeFile()), [dispatch])

  useEffect(() => {
    setTimeout(() => {
      preRef.current.scrollTop = 0

      if (file) codeRef.current.innerHTML = file.content || '<i>empty</i>'
      else if (error) codeRef.current.innerHTML = error.message
      else codeRef.current.innerHTML = ''
    })
  }, [file, error])

  return (
    <Modal
      open={!!openedFile}
      onClose={close}
      classes={{ content: classes.modalContent }}
      keepMounted
    >
      <Header onClose={close} openedFile={openedFile} />
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
        openedFile={openedFile}
        isLoading={isLoading}
        opacity={opacity}
        setOpacity={setOpacity}
      />
    </Modal>
  )
}

export default FileViewer
