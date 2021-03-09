import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
import { openModal } from 'store/actions/modals'
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
          Icon: HelpOutlineIcon,
          text: 'about the app',
        },
      ]}
    />
  )
}

export default AboutButton
