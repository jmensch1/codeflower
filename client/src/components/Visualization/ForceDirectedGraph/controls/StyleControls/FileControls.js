import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useVisStyles } from 'store/selectors'
import { updateVisStyles } from 'store/actions/settings'
import Slider from 'components/core/Slider'
import ColorPicker from 'components/core/ColorPicker'
import GradientPicker from 'components/core/GradientPicker'
import Swatch from 'components/core/Swatch'
import Swatches from 'components/core/Swatches'
import Row from '../Row'
import { getPaths, createUpdaters, noop } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const PATHS = [
  'files.fill',
  'files.radius.coeff',
  'files.radius.exponent',
  'files.stroke',
  'files.strokeWidth',
]

const RANGES = {
  'files.radius.coeff': [1, 50, 1],
  'files.radius.exponent': [0, 1, 0.01],
  'files.strokeWidth': [0, 10, 0.5],
}

const FileControls = () => {
  const classes = useStyles()
  const visStyles = useVisStyles()
  const dispatch = useDispatch()

  const values = useMemo(() => {
    return getPaths(visStyles, PATHS)
  }, [visStyles])

  const updaters = useMemo(() => {
    return createUpdaters(PATHS, updateVisStyles, dispatch)
  }, [dispatch])

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
                color={values['files.fill']}
                num={9}
                size="1em"
                margin="0 0 0 0.5em"
              />
            )
            : <Swatch color={values['files.fill']} />
        }
      >
        <GradientPicker
          color={values['files.fill']}
          onChange={updaters['files.fill']}
        />
      </Row>

      <Row
        label="radius"
        level={1}
        headerRight={
          <>
            {values['files.radius.coeff']}
            {' / '}
            {values['files.radius.exponent'].toFixed(2)}
          </>
        }
      >
        <Slider
          label="coefficient"
          range={RANGES['files.radius.coeff']}
          value={values['files.radius.coeff']}
          onChange={updaters['files.radius.coeff']}
          renderValue={noop}
        />
        <Slider
          label="exponent"
          range={RANGES['files.radius.exponent']}
          value={values['files.radius.exponent']}
          onChange={updaters['files.radius.exponent']}
          renderValue={noop}
        />
      </Row>

      <Row
        label="stroke"
        level={1}
        headerRight={<Swatch color={values['files.stroke']} />}
      >
        <ColorPicker
          color={values['files.stroke']}
          onChange={updaters['files.stroke']}
        />
      </Row>

      <Row
        label="stroke width"
        level={1}
        headerRight={values['files.strokeWidth'].toFixed(1)}
      >
        <Slider
          range={RANGES['files.strokeWidth']}
          value={values['files.strokeWidth']}
          onChange={updaters['files.strokeWidth']}
        />
      </Row>
    </div>
  )
}

export default FileControls
