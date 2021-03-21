import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { useRepo } from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import SearchBar from './SearchBar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      padding: 30,
      maxWidth: 'none',
      maxHeight: 'none',
      margin: 0,
      borderRadius: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.background.default,
      // TODO: tie into MainTheme? currently background is determined by
      // root theme, i.e. MUI default dark
    },
  },
  closeButton: {
    position: 'absolute',
    top: '1em',
    right: '1em',
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
      onClose={repo ? close : undefined}
    >
      {repo && (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={close}
        >
          <CloseIcon fontSize="large" />
        </IconButton>
      )}
      <SearchBar onComplete={close} />
    </Dialog>
  )
}

export default Search
