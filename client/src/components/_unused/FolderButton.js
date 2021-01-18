import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FolderIcon from '@material-ui/icons/FolderOpen'
import { useSelectedFolderPath, useModal } from 'store/selectors'
import { openModal, closeModal } from 'store/actions/modals'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid white',
    cursor: 'pointer',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))

const FolderButton = () => {
  const classes = useStyles()
  const selectedFolderPath = useSelectedFolderPath()
  const dispatch = useDispatch()
  const {
    isOpen,
    params: { contentType },
  } = useModal('sidebar')

  const toggle = useCallback(() => {
    if (isOpen && contentType === 'folders') dispatch(closeModal('sidebar'))
    else dispatch(openModal('sidebar', { contentType: 'folders' }))
  }, [isOpen, contentType, dispatch])

  return (
    <div className={classes.root} onClick={toggle}>
      <Typography className={classes.text}>{selectedFolderPath}</Typography>
      <FolderIcon fontSize="small" />
    </div>
  )
}

export default FolderButton
