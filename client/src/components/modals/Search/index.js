import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { useRepo } from 'store/selectors'
import { closeModal } from 'store/modals'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import SearchBar from './SearchBar'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: ({ repo }) => repo ? undefined : theme.palette.background.default,
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      padding: 30,
      maxWidth: 'none',
      backgroundColor: ({ repo }) => repo ? undefined : 'transparent',
    },
    '& .MuiBackdrop-root': {
      backgroundColor: ({ repo }) => repo ? undefined : 'transparent',
    }
  },
}))

const Search = () => {
  const repo = useRepo()
  const classes = useStyles({ repo })
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
    >
      <SearchBar onComplete={close} />
    </Dialog>
  )
}

export default Search
