import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FolderIcon from '@material-ui/icons/FolderOpen'
import { useSelectedFolderPath } from 'store/selectors'
import { toggleModal } from 'store/actions/modals'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid white',
    cursor: 'pointer',
  },
}))

const FolderButton = () => {
  const classes = useStyles()
  const selectedFolderPath = useSelectedFolderPath()
  const dispatch = useDispatch()

  return (
    <div
      className={classes.root}
      onClick={() => dispatch(toggleModal('tree'))}>
      <Typography>{ selectedFolderPath }</Typography>
      <FolderIcon fontSize='small' />
    </div>
  )
}

export default FolderButton
