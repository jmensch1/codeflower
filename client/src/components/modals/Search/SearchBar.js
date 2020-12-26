import React, { useState, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { useDispatch } from 'react-redux'
import { updateQuery } from 'store/router'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: 500,
    maxWidth: '100%',
    borderBottom: '1px white solid',
    height: 44,
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: theme.palette.text.primary,
    fontSize: 16,
    marginBottom: 0,
    height: '100%',
    width: '100%',
  },
  repo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    color: theme.palette.grey[500],
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

const SearchBar = ({ onComplete }) => {
  const classes = useStyles()
  const [url, setUrl] = useState('')
  const [repo, setRepo] = useState({})
  const dispatch = useDispatch()

  const repoString = useMemo(() => {
    const { owner, name, branch } = repo
    if (!owner || !name) return ''
    return `${owner}/${name} (${branch || 'default branch'})`
  }, [repo])

  const search = useCallback(() => {
    setUrl('')
    dispatch(updateQuery(repo))
    if (onComplete) onComplete()
  }, [repo, dispatch, onComplete])

  const onChange = useCallback((e) => {
    const { value } = e.target
    setUrl(value)
    setRepo(parseGitUrl(value))
  }, [])

  const onKeyPress = useCallback((e) => {
    if (!repoString) return
    const code = e.keyCode ? e.keyCode : e.which
    if (code === 13) search()
  }, [repoString, search])

  return (
    <div className={classes.outer}>
      <div className={classes.root}>
        <input
          type="text"
          value={url}
          onChange={onChange}
          onKeyPress={onKeyPress}
          className={classes.input}
          spellCheck={false}
          placeholder='e.g. https://github.com/bob/burgers-again'
        />
        <IconButton
          onClick={search}
          size='small'
          disabled={!repoString}
        >
          <SearchIcon fontSize='large' />
        </IconButton>
      </div>
      <div className={classes.repo}>{repoString}</div>
    </div>
  )
}

export default SearchBar
