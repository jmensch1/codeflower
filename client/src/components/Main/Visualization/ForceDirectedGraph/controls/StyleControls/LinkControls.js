import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'
import { useVisStyles } from 'store/selectors'
import { updateVisStyles } from 'store/actions/vis'
import Slider from 'components/core/Slider'
import ColorPicker from 'components/core/ColorPicker'
import Swatch from 'components/core/Swatch'
import Collapse from 'components/core/Collapse'
import { getPaths, createUpdaters } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const PATHS = ['links.stroke', 'links.strokeWidth']

const RANGES = {
  'links.strokeWidth': [0, 10, 0.5],
}

const LinkControls = () => {
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
      <Collapse
        label="stroke"
        level={1}
        headerRight={<Swatch color={values['links.stroke']} />}
      >
        <ColorPicker
          color={values['links.stroke']}
          onChange={updaters['links.stroke']}
        />
      </Collapse>
      <Collapse
        label="stroke width"
        level={1}
        headerRight={values['links.strokeWidth'].toFixed(1)}
      >
        <Slider
          range={RANGES['links.strokeWidth']}
          value={values['links.strokeWidth']}
          onChange={updaters['links.strokeWidth']}
        />
      </Collapse>
    </div>
  )
}

export default LinkControls
