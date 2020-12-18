import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography } from '@material-ui/core'
import FolderSelect from './FolderSelect'
import VisThemeSelect from './VisThemeSelect'
import MainThemeSelect from './MainThemeSelect'
import VisTypeSelect from './VisTypeSelect'
import { useRepo } from 'store/selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: theme.spacing(1),
    userSelect: 'none',
    '& > .MuiFormControl-root:not(:first-of-type)': {
      display: 'block',
      width: '100%',
      '&:not(:first-child)': {
        marginTop: '20px',
      },
    }
  },
}))

const Control = () => {
  const classes = useStyles()
  const repo = useRepo()

  if (!repo) return null
  return (
    <Paper className={classes.root}>
      <Typography variant='h6' align='center'>{ repo.fullName }</Typography>
      <Typography variable='subtitle2' align='center'>
        ({ repo.branch })
      </Typography>
      <FolderSelect />
      <VisThemeSelect />
      <VisTypeSelect />
      <MainThemeSelect />
    </Paper>
  )
}

export default Control
