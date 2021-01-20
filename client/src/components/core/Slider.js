import React, { useCallback } from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiSlider from '@material-ui/core/Slider'
import { getIn, setIn } from 'services/utils'

const Slider = withStyles((theme) => ({
  root: {
    color: 'white',
    marginBottom: 10,
  },
  valueLabel: {
    color: 'black',
  },
}))(MuiSlider)

export const SmartSlider = ({ range, obj, path, onChange, ...rest }) => {
  const [min, max, step] = range || []

  const handleChange = useCallback((e, newVal) => {
    onChange(setIn(obj, path, newVal))
  }, [obj, path, onChange])

  return (
    <Slider
      min={min}
      max={max}
      step={step}
      value={getIn(obj, path)}
      onChange={handleChange}
      { ...rest }
    />
  )
}

export default Slider
