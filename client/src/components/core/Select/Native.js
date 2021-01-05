import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  select: {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
    outline: 0,
    border: 0,
    borderBottom: `1px solid ${theme.palette.text.primary}`,
    padding: '4px 0',
    cursor: 'pointer',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    width: '100%',
    ...theme.typography.body1,
  },
}))

const Select = ({
  value = null,
  options = [],
  onChange = () => {},
  onHover = () => {},
}) => {
  const classes = useStyles()

  const handleChange = useCallback((e) => {
    onChange(e.target.value)
  }, [onChange])

  return (
    <select className={classes.select} value={value} onChange={handleChange}>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

export default Select
