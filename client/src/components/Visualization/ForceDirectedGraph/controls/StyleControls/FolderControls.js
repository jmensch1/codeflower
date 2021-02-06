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

  const onUpdateStyles = useCallback(
    (path, value) => {
      dispatch(updateVisStyles(path, value))
    },
    [dispatch]
  )

  const onChangeFolderFill = useMemo(
    () => onUpdateStyles.bind(null, 'folders.fill'),
    [onUpdateStyles]
  )

  const onChangeFolderStroke = useMemo(
    () => onUpdateStyles.bind(null, 'folders.stroke'),
    [onUpdateStyles]
  )

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <Row
        label="fill"
        level={1}
        headerRight={<Swatch color={getPath(visStyles, 'folders.fill')} />}>
        <ColorPicker
          color={getPath(visStyles, 'folders.fill')}
          onChange={onChangeFolderFill}
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
          color={getPath(visStyles, 'folders.stroke')}
          onChange={onChangeFolderStroke}
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
