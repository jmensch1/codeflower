import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useRepo } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  break: {
    wordBreak: 'break-word',
  },
  noBreak: {
    whiteSpace: 'nowrap',
  },
}))

const RepoHeader = () => {
  const classes = useStyles()
  const repo = useRepo()

  if (!repo) return null
  return (
    <>
      <Typography variant="h6" align="center" className={classes.break}>
        <span className={classes.noBreak}>{repo.owner}</span>/
        <span className={classes.noBreak}>{repo.name}</span>
      </Typography>
      <Typography align="center">({repo.branch})</Typography>
    </>
  )
}

export default RepoHeader
