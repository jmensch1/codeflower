import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GradientPicker from 'components/core/GradientPicker'
import { useVisStyles } from 'store/selectors'
import { updateVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '12px 12px 16px 12px',
  },
}))

const Picker = () => {
  const classes = useStyles()
  const visStyles = useVisStyles()
  const dispatch = useDispatch()

  const onChange = useCallback((value) => {
    dispatch(updateVisStyles('files.fill', value))
  }, [dispatch])

  return (
    <div className={classes.root}>
      <GradientPicker
        color={visStyles.files.fill}
        onChange={onChange}
        showLabels={false}
      />
    </div>
  )
}

export default Picker
