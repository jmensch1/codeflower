import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useRepo } from 'store/selectors'
import { highlightUser } from 'store/actions/settings'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[800],
    }
  },
}))

const Authors = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const repo = useRepo()

  const highlight = useCallback((userId) => {
    dispatch(highlightUser(userId))
  }, [dispatch])

  if (!repo) return null

  const { users: authors } = repo
  return (
    <div className={classes.root} onMouseLeave={highlight.bind(null, null)}>
      {authors.map((author) => (
        <div
          key={author.id}
          className={classes.listItem}
          onMouseEnter={highlight.bind(null, author.id)}
        >
          <Typography>
            [{author.id}] {author.name} ({author.numFilesTouched})
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default Authors
