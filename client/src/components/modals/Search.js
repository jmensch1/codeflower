import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/modals'
import { updateQuery } from 'store/router'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
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

function parseGitUrl(url) {
  url = url
    .replace(/^.*?github\.com\//, '')
    .replace(/\/$/, '')
    .replace(/\.git$/, '')

  const [owner, name, tree, branch] = url.split('/')
  return {
    owner,
    name,
    branch: tree === 'tree' ? branch : undefined,
  }
}

const Search = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen } = useModal('search')
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const search = () => {
    const { owner, name, branch } = parseGitUrl(url)
    if (!owner || !name) {
      setError('Could not parse url.')
    } else {
      setUrl('')
      dispatch(updateQuery({ owner, name, branch }))
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
      <Typography variant='h6'>
        Enter the URL of a repo hosted on Github
      </Typography>
      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <TextField
          style={{ width: 500 }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          autoFocus
          variant='outlined'
          label='Github URL'
        />
        <Button
          className={classes.searchButton}
          variant='outlined'
          onClick={search}
          disabled={!url}
        >
          Go
        </Button>
      </Box>
      { error }
    </Dialog>
  )
}

export default Search
