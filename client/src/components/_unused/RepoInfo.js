import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRepo } from 'store/selectors'
import Paper from '@material-ui/core/Paper'
import RepoHeader from './RepoHeader'
import FolderButton from './FolderButton'
import AuthorButton from './AuthorButton'
import LanguagesTable from './LanguagesTable'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 360,
    maxHeight: 'calc(100% - 20px)',
    zIndex: 1,
    padding: 0,
    userSelect: 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    ...theme.languages,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    opacity: 0.95,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
  },
  scroller: {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(1),
  },
  button: {
    margin: '15px 10px',
  },
}))

const Languages = () => {
  const classes = useStyles()
  const repo = useRepo()

  if (!repo) return null
  return (
    <Paper className={classes.paper}>
      <div className={classes.background} />
      <div className={classes.scroller}>
        <RepoHeader />
        <div className={classes.button}>
          <FolderButton />
        </div>
        <div className={classes.button}>
          <AuthorButton />
        </div>
        <LanguagesTable />
      </div>
    </Paper>
  )
}

export default Languages
