import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import TerminalIcon from '@material-ui/icons/Laptop'
import { toggleModal } from 'store/actions/modals'
import ToggleButton from '../core/ToggleButton'

const AboutButton = () => {
  const dispatch = useDispatch()

  const onChange = useCallback(() => {
    dispatch(toggleModal('terminal'))
  }, [dispatch])

  return (
    <ToggleButton
      value={false}
      onChange={onChange}
      buttons={[
        {
          value: false,
          Icon: TerminalIcon,
          text: 'toggle terminal',
        },
      ]}
    />
  )
}

export default AboutButton
