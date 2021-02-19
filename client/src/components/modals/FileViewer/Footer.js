import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HighlightSelect from './HighlightSelect'
import CircularProgress from '@material-ui/core/CircularProgress'
import Slider from 'components/core/Slider'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.875em',
    height: '3.5em',
    position: 'relative',
  },
  leftContent: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: '1em',
  },
  slider: {
    width: 200,
  },
  select: {
    width: 120,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '1em',
    '& select': {
      borderBottom: 'none',
      padding: 0,
      fontSize: '1em',
      userSelect: 'none',
    }
  },
}))

const OPACITY_RANGE = [0.1, 1]

const Footer = ({ openedFile, isLoading, opacity, setOpacity }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.leftContent}>
        {isLoading
          ? <CircularProgress size={14} color="inherit" />
          : (
            <div>
              {openedFile?.languageUnknown
                ? <i>language unknown</i>
                :  `${openedFile?.language} / ${openedFile?.size} loc`
              }
            </div>
          )
        }
      </div>
      <div className={classes.slider}>
        <Slider value={opacity} range={OPACITY_RANGE} onChange={setOpacity} />
      </div>
      <div className={classes.select}>
        <HighlightSelect />
      </div>
    </div>
  )
}

export default Footer
