import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/modals'
import { updateQuery } from 'store/router'
import { makeStyles } from '@material-ui/core/styles'
import {
  Dialog,
  Typography,
  Button,
  Box,
  TextField,
} from '@material-ui/core'
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

function parseGitUrl(url) {
  const match = url.match(/https:\/\/github.com\/(.*?)\/(.*?)\.git/)
  if (!match) return {}
  return {
    owner: match[1],
    name: match[2],
  }
}

const Search = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen } = useModal('search')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const search = () => {
    const { owner, name } = parseGitUrl(url)
    if (!owner || !name) {
      setError('Could not parse url.')
    } else {
      setUrl('')
      dispatch(updateQuery({ owner, name }))
      dispatch(closeModal('search'))
    }
  }

  if (!isOpen) return null

  return (
    <Dialog
      className={classes.root}
      open={isOpen}
      onClose={() => dispatch(closeModal('search'))}
      TransitionComponent={Zoom}
    >
      <Typography>
        Enter a git clone url:
      </Typography>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          className={classes.searchButton}
          variant='contained'
          onClick={search}
        >
          Go
        </Button>
      </Box>
      { error }
    </Dialog>
  )
}

export default Search
