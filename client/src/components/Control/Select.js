import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Selector = ({
  value = null,
  onChange = () => {},
  options = [],
  helperText,
}) => {
  const classes = useStyles()
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor="age-native-helper">{ helperText }</InputLabel>
      <NativeSelect
        value={value}
        onChange={onChange}
        // inputProps={{
        //   name: 'age',
        //   id: 'age-native-helper',
        // }}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </NativeSelect>
      {/*<FormHelperText>{ helperText }</FormHelperText>*/}
    </FormControl>
  )
}

export default Selector
