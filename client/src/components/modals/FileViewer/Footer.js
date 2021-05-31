import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HighlightSelect from './HighlightSelect'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
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
  centerContent: {
    display: 'flex',
    alignItems: 'center',
  },
  fontSizeContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  fontSizeButton: {
    margin: '0 0.5em',
  },
  fontSize: {
    fontSize: '1em',
    width: '1.5em',
    textAlign: 'center',
  },
  slider: {
    width: 150,
    marginLeft: '3em',
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
    },
  },
}))

const OPACITY_RANGE = [0.1, 1]
const FONT_SIZE_RANGE = [10, 24]

const Footer = ({
  openedFile,
  isLoading,
  opacity,
  setOpacity,
  fontSize,
  setFontSize,
}) => {
  const classes = useStyles()

  const updateFontSize = useCallback(
    (increment) => {
      setFontSize((size) => {
        const [min, max] = FONT_SIZE_RANGE
        return Math.max(min, Math.min(max, size + increment))
      })
    },
    [setFontSize]
  )

  return (
    <div className={classes.root}>
      <div className={classes.leftContent}>
        {isLoading ? (
          <CircularProgress
            size={14}
            color="inherit"
            style={{ display: 'block' }}
          />
        ) : (
          <div>
            {openedFile?.languageUnknown ? (
              <i>language unknown</i>
            ) : (
              `${openedFile?.language} / ${openedFile?.size} loc`
            )}
          </div>
        )}
      </div>
      <div className={classes.centerContent}>
        <div className={classes.fontSizeContainer}>
          <IconButton
            aria-label="reduce font size"
            size="small"
            className={classes.fontSizeButton}
            onClick={updateFontSize.bind(null, -2)}
            disabled={fontSize <= FONT_SIZE_RANGE[0]}
          >
            <RemoveIcon style={{ fontSize: '1em' }} />
          </IconButton>
          <div className={classes.fontSize}>{fontSize}</div>
          <IconButton
            aria-label="increase font size"
            size="small"
            className={classes.fontSizeButton}
            onClick={updateFontSize.bind(null, 2)}
            disabled={fontSize >= FONT_SIZE_RANGE[1]}
          >
            <AddIcon style={{ fontSize: '1em' }} />
          </IconButton>
        </div>
        <div className={classes.slider}>
          <Slider value={opacity} range={OPACITY_RANGE} onChange={setOpacity} />
        </div>
      </div>
      <div className={classes.select}>
        <HighlightSelect />
      </div>
    </div>
  )
}

export default Footer
