import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import CameraIcon from '@material-ui/icons/CameraAlt'
import { openModal } from 'store/actions/modals'
import ToggleButton from '../core/ToggleButton'

const ExportButton = () => {
  const dispatch = useDispatch()

  const onChange = useCallback(() => {
    dispatch(openModal('export'))
  }, [dispatch])

  return (
    <ToggleButton
      value={false}
      onChange={onChange}
      buttons={[
        {
          value: false,
          Icon: CameraIcon,
          text: 'export',
        },
      ]}
    />
  )
}

export default ExportButton
