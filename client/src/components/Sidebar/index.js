import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import Folders from './Folders'
import Authors from './Authors'

const WIDTH = 250

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100vh',
    backgroundColor: 'black',
    width: ({ isOpen }) => (isOpen ? WIDTH : 0),
    transition: 'width 0.35s ease-in-out',
  },
  inner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: ({ isOpen }) => (isOpen ? 0 : -WIDTH),
    transition: 'left 0.35s ease-in-out',
    width: WIDTH,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5em',
    borderBottom: '0.5px white dotted',
  },
  content: {
    flex: 1,
    overflow: 'auto',
  },
}))

const Sidebar = () => {
  const {
    isOpen,
    params: { contentType },
  } = useModal('sidebar')
  const classes = useStyles({ isOpen })
  const dispatch = useDispatch()
  const [type, setType] = useState('folders')

  useEffect(() => {
    if (contentType) setType(contentType)
  }, [contentType])

  const close = useCallback(() => {
    dispatch(closeModal('sidebar'))
  }, [dispatch])

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.header}>
          <Typography variant="body2">
            select {type.replace(/s$/, '')}
          </Typography>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={close}
            size="small"
          >
            <ArrowBackIcon fontSize="small" />
          </IconButton>
        </div>
        <div className={classes.content}>
          <div
            id="vis-controls"
            style={{ display: contentType === 'controls' ? 'block' : 'none' }}
          />
          {(() => {
            switch (type) {
              case 'folders':
                return <Folders />
              case 'authors':
                return <Authors />
              default:
                return null
            }
          })()}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
