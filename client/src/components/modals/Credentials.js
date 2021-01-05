import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import { getRepo } from 'store/actions/repo'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import TextButton from 'components/core/TextButton'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      padding: '20px 30px',
      maxWidth: 500,
    },
  },
  textField: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '1px white solid',
    outline: 'none',
    color: theme.palette.text.primary,
    fontSize: '1rem',
    marginBottom: 20,
    width: '100%',
    padding: '6px 0',
    fontFamily: 'Roboto',
  },
  searchButton: {
    marginTop: 15,
  },
}))

const Credentials = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {
    isOpen,
    params: { owner, name, branch, error },
  } = useModal('credentials')

  const search = () => {
    dispatch(
      getRepo({
        owner,
        name,
        branch,
        username,
        password,
      })
    )
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
    >
      <Typography variant="h6" align="center">
        Private repo
      </Typography>
      {(() => {
        switch (error.name) {
          case 'NeedCredentials':
            return (
              <Typography component="div">
                <p>
                  {owner}/{name} is a private repo, so it can't be cloned
                  without credentials.
                </p>
                <p>
                  Obvi you shouldn't share your personal creds, so if you want
                  to continue, here's how you could do it relatively safely:
                </p>
                <ul>
                  <li>Create a dummy github account</li>
                  <li>Give that account read access to this repo</li>
                  <li>Enter the creds for that account below</li>
                </ul>
                <p>
                  Note that if 2FA is enabled on the account, cloning requires a
                  personal access token in place of a password.
                </p>
              </Typography>
            )
          case 'CredentialsInvalid':
            return (
              <Typography component="div">
                <p>
                  The credentials you provided didn't work. Feel free to try
                  other ones.
                </p>
              </Typography>
            )
          default:
            throw new Error('Invalid error name.')
        }
      })()}
      <div
        style={{
          textAlign: 'center',
          margin: '10px 30px 0',
        }}
      >
        <input
          className={classes.textField}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="github username"
        />
        <input
          className={classes.textField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="github password or token"
        />
        <TextButton
          label="Go"
          onClick={search}
          disabled={!username || !password}
          className={classes.searchButton}
        />
      </div>
    </Dialog>
  )
}

export default Credentials
