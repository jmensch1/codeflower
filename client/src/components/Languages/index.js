import React from 'react'
import { useDispatch } from 'react-redux'
import { useLanguages } from 'store/selectors'
import { selectLanguage } from 'store/languages'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    padding: theme.spacing(1),
    userSelect: 'none',
    ...theme.languages,
  },
  table: {
    borderCollapse: 'collapse',
    '& th, & td': {
      textAlign: 'left',
      padding: '5px 10px',
    },
    '& td:last-child': {
      textAlign: 'center',
      '& > div': {
        margin: '0 auto',
        height: 16,
        width: 16,
        borderRadius: 8,
      }
    },
    '& tbody tr': {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.grey[600],
      },
    },
  }
}))

const Languages = () => {
  const classes = useStyles()
  const languages = useLanguages()
  const dispatch = useDispatch()

  const onSelectLanguage = (langClass) => {
    dispatch(selectLanguage(langClass))
  }

  if (!languages) return null
  return (
    <Paper className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>language</th>
            <th>files</th>
            <th>lines</th>
            <th>color</th>
          </tr>
        </thead>
        <tbody onMouseLeave={() => onSelectLanguage(undefined)}>
          {languages.map(lang => (
            <tr
              key={lang.language}
              onMouseEnter={() => onSelectLanguage(lang.class)}
            >
              <td>{ lang.language }</td>
              <td>{ lang.files }</td>
              <td>{ lang.lines }</td>
              <td><div className={lang.class} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  )
}

export default Languages
