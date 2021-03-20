import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
import PauseIcon from '@material-ui/icons/PauseCircleOutline'
import LeftIcon from '@material-ui/icons/FastRewind'
import RightIcon from '@material-ui/icons/FastForward'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px ${theme.palette.divider} solid`,
    padding: '0.5em',
  },
  playPauseButton: {
    display: 'none',
  },
  forwardBackButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '6em',
  },
  icon: {
    fontSize: 24,
    display: 'block',
    opacity: 0.5,
    cursor: 'pointer',
    '&:hover:not(:active)': {
      opacity: 1.0,
    },
  },
}))

const Buttons = ({ prev, next, isPlaying, toggleIsPlaying }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.playPauseButton}>
        {isPlaying ? (
          <PauseIcon className={classes.icon} onClick={toggleIsPlaying} />
        ) : (
          <PlayIcon className={classes.icon} onClick={toggleIsPlaying} />
        )}
      </div>
      <div className={classes.forwardBackButtons}>
        <LeftIcon className={classes.icon} onClick={prev} />
        <RightIcon className={classes.icon} onClick={next} />
      </div>
    </div>
  )
}

export default Buttons
