import React from 'react'
import { useDispatch } from 'react-redux'
import { useSettings } from 'store/selectors'
import { setVisType } from 'store/settings'
import Select from './Select'

const VisTypeSelect = () => {
  const dispatch = useDispatch()
  const { visType } = useSettings()
  return (
    <Select
      value={visType}
      onChange={e => dispatch(setVisType(e.target.value))}
      options={['force', 'sunburst']}
      helperText='vis type'
    />
  )
}

export default VisTypeSelect
