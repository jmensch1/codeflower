import React from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

// const useStyles = makeStyles((theme) => ({}))

const Select = ({
  value = null,
  options = [],
  onChange = () => {},
  onHover = () => {},
}) => {
  return (
    <Autocomplete
      autoSelect
      disableClearable={value === options[0]}
      blurOnSelect
      fullWidth
      selectOnFocus={false}
      renderInput={(params) => <TextField {...params} margin="normal" />}
      options={options}
      value={value}
      onChange={(_, option) => {
        if (option) onChange(option)
        else onChange(options[0])
      }}
      ListboxProps={{ onMouseLeave: () => onHover(null) }}
      onHighlightChange={(_, option) => onHover(option)}
    />
  )
}

export default Select
