import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { useAuthors, useSelectedAuthorId } from 'store/selectors'
import { selectAuthor, highlightAuthor } from 'store/actions/settings'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    '& th, & td': {
      textAlign: 'left',
      padding: '5px 10px',
      '&:not(:first-child)': {
        textAlign: 'center',
      }
    },
    '& tbody tr': {
      cursor: 'pointer',
      '&:hover:not($selected)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    '& tfoot tr': {
      fontWeight: 'bold',
    },
  },
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
}))

const Authors = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const authors = useAuthors()
  const selectedAuthorId = useSelectedAuthorId()

  const highlight = useCallback(
    (authorId) => {
      dispatch(highlightAuthor(authorId))
    },
    [dispatch]
  )

  const select = useCallback(
    (authorId) => {
      dispatch(selectAuthor(authorId))
    },
    [dispatch]
  )

  const clear = useCallback(() => {
    select(null)
    highlight(null)
  }, [select, highlight])

  if (!authors) return null
  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>author</th>
            <th>commits</th>
            {/*<th>touched</th>*/}
          </tr>
        </thead>
        <tbody onMouseLeave={clear}>
          {authors.map((author) => {
            return (
              <tr
                key={author.id}
                className={clsx({
                  [classes.selected]: author.id === selectedAuthorId,
                })}
                onMouseEnter={highlight.bind(null, author.id)}
                // onClick={() => {
                //   if (author.id === selectedAuthorId) select(null)
                //   else select(author.id)
                // }}
              >
                <td>{author.name}</td>
                <td>{author.commits}</td>
                {/*<td>{author.numFilesTouched}</td>*/}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
