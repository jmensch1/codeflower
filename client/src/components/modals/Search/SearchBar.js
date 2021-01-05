import React, { useState, useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import { useDispatch } from 'react-redux'
import { updateQuery } from 'store/actions/router'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'table',
    verticalAlign: 'middle',
    width: 900,
    maxWidth: '100%',
    fontSize: 24,
    fontFamily: 'monospace',
  },
  label: {
    whiteSpace: 'nowrap',
    display: 'table-cell',
    width: 1,
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    color: theme.palette.text.primary,
    fontSize: 'inherit',
    fontFamily: 'inherit',
    display: 'table-cell',
    width: '100%',
    padding: '2px 0',
    backgroundImage:
      'linear-gradient(to right, #fff 50%, rgba(255,255,255,0) 0%)',
    backgroundPosition: 'bottom',
    backgroundSize: '4px 1px',
    backgroundRepeat: 'repeat-x',
  },
  icon: {
    display: 'table-cell',
    paddingLeft: 6,
    width: 1,
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

  const onKeyPress = useCallback(
    (e) => {
      if (!repoString) return
      const code = e.keyCode ? e.keyCode : e.which
      if (code === 13) search()
    },
    [repoString, search]
  )

  return (
    <div className={classes.root}>
      <label htmlFor="url-input" className={classes.label}>
        git clone&nbsp;
      </label>
      <input
        type="text"
        id="url-input"
        value={url}
        onChange={onChange}
        onKeyPress={onKeyPress}
        className={classes.input}
        spellCheck={false}
        autoFocus
      />
      <div className={classes.icon}>
        <IconButton
          aria-label="go"
          onClick={search}
          size="small"
          disabled={!repoString}
        >
          <KeyboardReturnIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  )
}

export default SearchBar
