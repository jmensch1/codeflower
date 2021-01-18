import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AuthorIcon from '@material-ui/icons/PersonOutline'
import { useModal, useSelectedAuthor } from 'store/selectors'
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

const AuthorButton = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    isOpen,
    params: { contentType },
  } = useModal('sidebar')
  const selectedAuthor = useSelectedAuthor()

  const toggle = useCallback(() => {
    if (isOpen && contentType === 'authors') dispatch(closeModal('sidebar'))
    else dispatch(openModal('sidebar', { contentType: 'authors' }))
  }, [isOpen, contentType, dispatch])

  return (
    <div className={classes.root} onClick={toggle}>
      <Typography className={classes.text}>
        {selectedAuthor ? selectedAuthor.name : 'all authors'}
      </Typography>
      <AuthorIcon fontSize="small" />
    </div>
  )
}

export default AuthorButton
