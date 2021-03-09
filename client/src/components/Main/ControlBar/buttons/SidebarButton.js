import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import SidebarIcon from '@material-ui/icons/Functions'
import { toggleModal } from 'store/actions/modals'
import ToggleButton from '../core/ToggleButton'

const AboutButton = () => {
  const dispatch = useDispatch()

  const onChange = useCallback(() => {
    dispatch(toggleModal('sidebar'))
  }, [dispatch])

  return (
    <ToggleButton
      value={false}
      onChange={onChange}
      buttons={[
        {
          value: false,
          Icon: SidebarIcon,
          text: 'toggle sidebar',
        },
      ]}
    />
  )
}

export default AboutButton
