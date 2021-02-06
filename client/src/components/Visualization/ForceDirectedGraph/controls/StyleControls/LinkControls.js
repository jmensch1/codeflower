import React, { useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useVisStyles } from 'store/selectors'
import { setVisStyles, updateVisStyles } from 'store/actions/settings'
import { SmartSlider } from 'components/core/Slider'
import ColorPicker from 'components/core/ColorPicker'
import Swatch from 'components/core/Swatch'
import Row from '../Row'
import { getPath } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const LinkControls = () => {
  const classes = useStyles()
  const visStyles = useVisStyles()
  const dispatch = useDispatch()

  const onChangeStyles = useCallback(
    (visStyles) => {
      dispatch(
        setVisStyles({
          ...visStyles,
          id: undefined,
        })
      )
    },
    [dispatch]
  )

  const onUpdateStyles = useCallback(
    (path, value) => {
      dispatch(updateVisStyles(path, value))
    },
    [dispatch]
  )

  const onChangeLinkStroke = useMemo(
    () => onUpdateStyles.bind(null, 'links.stroke'),
    [onUpdateStyles]
  )

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <Row
        label="stroke"
        level={1}
        headerRight={<Swatch color={getPath(visStyles, 'links.stroke')} />}
      >
        <ColorPicker
          color={getPath(visStyles, 'links.stroke')}
          onChange={onChangeLinkStroke}
        />
      </Row>
      <Row
        label="stroke width"
        level={1}
        headerRight={getPath(visStyles, 'links.strokeWidth').toFixed(1)}
      >
        <SmartSlider
          range={[0, 10, 0.5]}
          obj={visStyles}
          path="links.strokeWidth"
          onChange={onChangeStyles}
        />
      </Row>
    </div>
  )
}

export default LinkControls
