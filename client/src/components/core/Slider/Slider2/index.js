import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from './Slider'

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '0.875em',
    marginBottom: 4,
    padding: '0 4px',
  },
}))

const LabeledSlider = ({ label, value, ...rest }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {label && (
        <div className={classes.header}>
          <label className={classes.label}>{ label }</label>
          <span>
            { value instanceof Array ? `${value[0]}/${value[1]}` : value }
          </span>
        </div>
      )}
      <Slider value={value} { ...rest } />
    </div>
  )
}

export default LabeledSlider
