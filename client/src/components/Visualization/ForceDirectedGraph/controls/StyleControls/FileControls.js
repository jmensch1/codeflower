import React, { useCallback, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useVisStyles } from 'store/selectors'
import { setVisStyles, updateVisStyles } from 'store/actions/settings'
import Slider, { SmartSlider } from 'components/core/Slider'
import ColorPicker from 'components/core/ColorPickerNew'
import GradientPicker from 'components/core/GradientPicker'
import Swatch from 'components/core/Swatch'
import Swatches from 'components/core/Swatches'
import Row from '../Row'
import { getPath } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const FileControls = () => {
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

  const onChangeFileFill = useMemo(
    () => onUpdateStyles.bind(null, 'files.fill'),
    [onUpdateStyles]
  )

  const onChangeFileStroke = useMemo(
    () => onUpdateStyles.bind(null, 'files.stroke'),
    [onUpdateStyles]
  )

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <Row
        label="fill"
        level={1}
        headerRight={({ open }) =>
          open
            ? (
              <Swatches
                color={getPath(visStyles, 'files.fill')}
                num={9}
                size="1em"
                margin="0 0 0 0.5em"
              />
            )
            : <Swatch color={getPath(visStyles, 'files.fill')} />
        }
      >
        <GradientPicker
          color={getPath(visStyles, 'files.fill')}
          onChange={onChangeFileFill}
        />
      </Row>

      <Row
        label="radius"
        level={1}
        headerRight={
          <>
            {getPath(visStyles, 'files.radius.coeff')}
            {' / '}
            {getPath(visStyles, 'files.radius.exponent').toFixed(2)}
          </>
        }
      >
        <Slider
          label="coefficient"
          range={[1, 50, 1]}
          value={getPath(visStyles, 'files.radius.coeff')}
          onChange={onUpdateStyles.bind(null, 'files.radius.coeff')}
          renderValue={() => null}
        />
        <SmartSlider
          label="exponent"
          range={[0, 1, 0.01]}
          obj={visStyles}
          path="files.radius.exponent"
          onChange={onChangeStyles}
          renderValue={() => null}
        />
      </Row>

      <Row
        label="stroke"
        level={1}
        headerRight={<Swatch color={getPath(visStyles, 'files.stroke')} />}
      >
        <ColorPicker
          color={getPath(visStyles, 'files.stroke')}
          onChange={onChangeFileStroke}
        />
      </Row>

      <Row
        label="stroke width"
        level={1}
        headerRight={getPath(visStyles, 'files.strokeWidth').toFixed(1)}
      >
        <SmartSlider
          range={[0, 10, 0.5]}
          obj={visStyles}
          path="files.strokeWidth"
          onChange={onChangeStyles}
        />
      </Row>
    </div>
  )
}

export default FileControls
