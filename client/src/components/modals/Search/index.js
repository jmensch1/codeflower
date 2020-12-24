import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/modals'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import { Zoom } from 'components/Transitions'
import SearchBar from './SearchBar'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      padding: 30,
      paddingBottom: 15,
    },
    '& .MuiTypography-root': {
      marginBottom: 20,
    },
  },
}))

const Search = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen } = useModal('search')

  const close = () => {
    dispatch(closeModal('search'))
  }

  if (!isOpen) return null

  return (
    <Dialog
      className={classes.root}
      open={isOpen}
      onClose={close}
      TransitionComponent={Zoom}
    >
      <Typography variant='h6' align='center'>
        Enter the URL of a Github repo
      </Typography>
      <SearchBar onComplete={close} />
    </Dialog>
  )
}

export default Search
