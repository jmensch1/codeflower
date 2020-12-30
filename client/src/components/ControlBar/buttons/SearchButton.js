import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import SearchIcon from '@material-ui/icons/Search'
import { openModal } from 'store/modals'
import ToggleButton from '../core/ToggleButton'

const SearchButton = () => {
  const dispatch = useDispatch()

  const onChange = useCallback(() => {
    dispatch(openModal('search'))
  }, [dispatch])

  return (
    <ToggleButton
      value={false}
      onChange={onChange}
      buttons={[
        {
          value: false,
          Icon: SearchIcon,
          text: 'search',
        },
      ]}
    />
  )
}

export default SearchButton
