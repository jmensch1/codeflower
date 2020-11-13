import React from 'react'
import { useDispatch } from 'react-redux'
import { useLanguages, useRepo } from 'store/selectors'
import { selectLanguage } from 'store/languages'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import FolderSelect from './FolderSelect'

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
    width: '100%',
    marginTop: 15,
    '& th, & td': {
      textAlign: 'left',
      padding: '5px 10px',
      '&:last-child': {
        textAlign: 'center',
      }
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
  const { counts, classes: langClasses } = useLanguages()
  const repo = useRepo()
  const dispatch = useDispatch()

  const onSelectLanguage = (langClass) => {
    dispatch(selectLanguage(langClass))
  }

  if (!repo || !counts) return null
  return (
    <Paper className={classes.root}>
      <Typography variant='h6' align='center'>{ repo.fullName }</Typography>
      <Typography variable='subtitle2' align='center'>
        ({ repo.branch })
      </Typography>
      <FolderSelect />
      <table className={classes.table}>
        <thead>
          <tr>
            <th>language</th>
            <th>files</th>
            <th>lines</th>
            <th>color</th>
          </tr>
        </thead>
        <tbody onMouseLeave={() => onSelectLanguage(null)}>
          {counts.map(count => (
            <tr
              key={count.language}
              onMouseEnter={() => onSelectLanguage(count.language)}
            >
              <td>{ count.language }</td>
              <td>{ count.files }</td>
              <td>{ count.lines }</td>
              <td><div className={langClasses[count.language]} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  )
}

export default Languages
