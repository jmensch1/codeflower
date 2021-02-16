import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const ARROW_WIDTH = '1.5em'

const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
    lineHeight: '1.8em',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    cursor: ({ disabled }) => disabled ? 'default' : 'pointer',
  },
  arrowAndLabel: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    opacity: ({ disabled }) => disabled ? 0.3 : 1,
    '&:hover': {
      textDecoration: ({ disabled }) => disabled ? 'none' : 'underline',
    }
  },
  arrow: {
    width: ARROW_WIDTH,
    height: ARROW_WIDTH,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '& > svg': {
      width: '1em',
      height: '1em',
      '& > polygon': {
        fill: theme.palette.text.primary,
      },
    },
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  headerRight: {
    alignSelf: 'stretch',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    paddingLeft: ARROW_WIDTH,
    position: 'relative',
  },
}))

const Collapse = ({
  label,
  headerRight,
  disabled,
  indent = true,
  level = 0,
  children,
  initialOpen = false,
  onMouseEnter = () => {},
}) => {
  const [open, setOpen] = useState(initialOpen)
  const [hovering, setHovering] = useState(false)
  const classes = useStyles({ open, indent, level, disabled })

  const headerRightContent =
    typeof headerRight === 'function' ? headerRight({ open, hovering }) : headerRight

  return (
    <div className={classes.root}>
      <div
        className={classes.header}
        onClick={disabled ? undefined : () => setOpen(!open)}
        onMouseEnter={onMouseEnter}
      >
        <div className={classes.arrowAndLabel}>
          <div className={classes.arrow}>
            <svg viewBox="0 0 20 20">
              <polygon
                points={open ? '5,5 10,15, 15,5' : '5,5 15,10 5,15'}
                className={classes.arrow}
              />
            </svg>
          </div>
          <div className={classes.label}>{label}</div>
        </div>
        <div
          className={classes.headerRight}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}>
          {headerRightContent}
        </div>
      </div>
      {open && (
        <div className={classes.content}>
          {disabled && <div className={classes.mask} />}
          {children}
        </div>
      )}
    </div>
  )
}

export default Collapse
