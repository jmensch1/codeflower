import React, { useCallback } from 'react'
import Slider from './Slider2'
import { getPath, setPath, hasPath } from 'services/utils'

export const SmartSlider = ({
  obj,
  defaultObj,
  path,
  onChange,
  transform = { in: (x) => x, out: (x) => x },
  ...rest
}) => {
  const handleChange = useCallback(
    (newVal) => {
      onChange(setPath(obj, path, transform.out(newVal)))
    },
    [obj, path, onChange, transform]
  )

  const value = hasPath(obj, path)
    ? transform.in(getPath(obj, path))
    : transform.in(getPath(defaultObj, path))

  return <Slider value={value} onChange={handleChange} {...rest} />
}

export default Slider
