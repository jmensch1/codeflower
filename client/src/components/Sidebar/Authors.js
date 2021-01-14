import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Typography from '@material-ui/core/Typography'
import { useAuthors, useSelectedAuthorId } from 'store/selectors'
import { selectAuthor, highlightAuthor } from 'store/actions/settings'

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
    },
    '&.selected': {
      textDecoration: 'underline',
    },
  },
}))

const Authors = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const authors = useAuthors()
  const selectedAuthorId = useSelectedAuthorId()

  const highlight = useCallback((authorId) => {
    dispatch(highlightAuthor(authorId))
  }, [dispatch])

  const select = useCallback((authorId) => {
    dispatch(selectAuthor(authorId))
  }, [dispatch])

  if (!authors) return null
  return (
    <div
      className={classes.root}
      onMouseLeave={highlight.bind(null, selectedAuthorId)}
    >
      {authors.map((author) => (
        <div
          key={author.id}
          className={clsx(classes.listItem, {
            selected: author.id === selectedAuthorId,
          })}
          onMouseEnter={highlight.bind(null, author.id)}
          onClick={() => {
            if (author.id === selectedAuthorId)
              select(null)
            else
              select(author.id)
          }}
        >
          <Typography>
            [{author.id}] {author.name} ({author.commits})
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default Authors
