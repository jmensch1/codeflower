import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import AdjustIcon from '@material-ui/icons/Adjust'
import GrainIcon from '@material-ui/icons/Grain'
import { setVisType } from 'store/settings'
import { useSettings } from 'store/selectors'
import ButtonGroup from '../core/ButtonGroup'

const VisTypeButtons = () => {
  const dispatch = useDispatch()
  const { visType } = useSettings()

  const onChange = useCallback((visType) => {
    dispatch(setVisType(visType))
  }, [dispatch])

  return (
    <ButtonGroup
      value={visType}
      onChange={onChange}
      buttons={[
        {
          value: 'force',
          Icon: GrainIcon,
          text: 'force',
        },
        {
          value: 'sunburst',
          Icon: AdjustIcon,
          text: 'sunburst',
        },
      ]}
    />
  )
}

export default VisTypeButtons
