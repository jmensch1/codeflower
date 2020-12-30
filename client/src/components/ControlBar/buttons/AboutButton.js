import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import InfoIcon from '@material-ui/icons/Info'
import { openModal } from 'store/modals'
import ToggleButton from '../core/ToggleButton'

const AboutButton = () => {
  const dispatch = useDispatch()

  const onChange = useCallback(() => {
    dispatch(openModal('about'))
  }, [dispatch])

  return (
    <ToggleButton
      value={false}
      onChange={onChange}
      buttons={[
        {
          value: false,
          Icon: InfoIcon,
          text: 'about the app',
        },
      ]}
    />
  )
}

export default AboutButton
