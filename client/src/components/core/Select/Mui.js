import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import MuiSelect from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  select: {
    backgroundColor: 'transparent',
    maxWidth: '100%',
    width: '100%',
  },
}))

const Select = ({
  value = null,
  options = [],
  onChange = () => {},
  onHover = () => {},
}) => {
  const classes = useStyles()

  const handleChange = useCallback(
    (e) => {
      onChange(e.target.value)
    },
    [onChange]
  )

  return (
    <MuiSelect
      className={classes.select}
      value={value}
      onChange={handleChange}
      MenuProps={{
        MenuListProps: {
          onMouseLeave: onHover.bind(null, null),
        },
      }}
    >
      {options.map((opt) => (
        <MenuItem key={opt} value={opt} onMouseEnter={onHover.bind(null, opt)}>
          {opt}
        </MenuItem>
      ))}
    </MuiSelect>
  )
}

export default Select
