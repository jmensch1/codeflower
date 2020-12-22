import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/modals'
import { getRepo } from 'store/repo'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { Zoom } from 'components/Transitions'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      padding: 20,
    },
    '& .MuiTypography-root': {
      maxWidth: 400,
      marginBottom: 15,
    },
    '& .MuiButton-root': {
      margin: '0 10px',
    }
  },
  searchButton: {
    backgroundColor: theme.palette.info.main,
  },
}))

const MaxNodes = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {
    isOpen,
    params: { owner, name, branch, error }
  } = useModal('credentials')

  const search = () => {
    dispatch(getRepo({
      owner,
      name,
      branch,
      username,
      password,
    }))
    setUsername('')
    setPassword('')
    dispatch(closeModal('credentials'))
  }

  if (!isOpen) return null

  return (
    <Dialog
      className={classes.root}
      open={isOpen}
      onClose={() => dispatch(closeModal('credentials'))}
      TransitionComponent={Zoom}
    >
      {(() => {
        switch(error.name) {
          case 'NeedCredentials':
            return (
              <Typography>
                This is a private repo. To continue, please provide credentials for
                a github account with read access for this repo.
              </Typography>
            )
          case 'CredentialsInvalid':
            return (
              <Typography>
                The credentials you provided are invalid.
              </Typography>
            )
          default:
            throw new Error('Invalid error name.')
        }
      })()}
      <div>
        <TextField
          style={{ width: 500 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          style={{ width: 500 }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button
          className={classes.searchButton}
          variant='contained'
          onClick={search}
        >
          Go
        </Button>
      </div>
    </Dialog>
  )
}

export default MaxNodes
