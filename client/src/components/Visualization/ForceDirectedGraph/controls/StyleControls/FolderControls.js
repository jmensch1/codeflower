import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { SmartSlider } from 'components/core/Slider'
import ColorPicker from 'components/core/ColorPicker'
import { useVisStyles } from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import Row from '../Row'
import Swatch from 'components/core/Swatch'
import { getPath } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const FolderControls = () => {
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

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <Row
        label="fill"
        level={1}
        headerRight={<Swatch color={getPath(visStyles, 'folders.fill')} />}>
        <ColorPicker
          label="fill: color"
          obj={visStyles}
          path="folders.fill"
          onChange={onChangeStyles}
        />
      </Row>
      <Row
        label="radius"
        level={1}
        headerRight={getPath(visStyles, 'folders.radius').toFixed(1)}
      >
        <SmartSlider
          range={[0, 20, 0.5]}
          obj={visStyles}
          path="folders.radius"
          onChange={onChangeStyles}
        />
      </Row>

      <Row
        label="stroke"
        level={1}
        headerRight={<Swatch color={getPath(visStyles, 'folders.stroke')} />}
      >
        <ColorPicker
          label="stroke: color"
          obj={visStyles}
          path="folders.stroke"
          onChange={onChangeStyles}
        />
      </Row>

      <Row
        label="stroke width"
        level={1}
        headerRight={getPath(visStyles, 'folders.strokeWidth').toFixed(1)}
      >
        <SmartSlider
          range={[0, 10, 0.5]}
          obj={visStyles}
          path="folders.strokeWidth"
          onChange={onChangeStyles}
        />
      </Row>
    </div>
  )
}

export default FolderControls
