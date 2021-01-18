import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import TuneIcon from '@material-ui/icons/Tune'
import { openModal, closeModal } from 'store/actions/modals'
import ToggleButton from '../core/ToggleButton'

const ControlsButton = () => {
  const dispatch = useDispatch()
  const {
    isOpen,
    params: { contentType },
  } = useModal('sidebar')

  const onChange = useCallback(() => {
    if (isOpen && contentType === 'controls') dispatch(closeModal('sidebar'))
    else dispatch(openModal('sidebar', { contentType: 'controls' }))
  }, [isOpen, contentType, dispatch])

  return (
    <ToggleButton
      value={false}
      onChange={onChange}
      buttons={[
        {
          value: false,
          Icon: TuneIcon,
          text: 'controls',
        },
      ]}
    />
  )
}

export default ControlsButton
