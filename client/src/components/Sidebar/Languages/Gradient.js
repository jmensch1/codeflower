import React, { useMemo, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import GradientPicker from 'components/core/GradientPicker'
import { useVisStyles } from 'store/selectors'
import { updateVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import { getPath } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
}))

const LanguagesGradient = () => {
  const classes = useStyles()
  const visStyles = useVisStyles()
  const dispatch = useDispatch()

  const onUpdateStyles = useCallback(
    (path, value) => {
      dispatch(updateVisStyles(path, value))
    },
    [dispatch]
  )

  const onChangeFileFill = useMemo(
    () => onUpdateStyles.bind(null, 'files.fill'),
    [onUpdateStyles]
  )

  return (
    <div className={classes.root}>
      <GradientPicker
        color={getPath(visStyles, 'files.fill')}
        onChange={onChangeFileFill}
        showLabels={false}
      />
    </div>
  )
}

export default LanguagesGradient
