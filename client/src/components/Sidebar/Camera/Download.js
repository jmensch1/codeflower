import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useRepo } from 'store/selectors'
import TextButton from 'components/core/TextButton'
import Slider from 'components/core/Slider'
import Checkbox from 'components/core/Checkbox'
import Select from 'components/core/Select'
import { useCamera } from 'store/selectors'
import { updateCamera } from 'store/actions/camera'
import { downloadDataUri } from './utils'

const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  instructions: {
    fontSize: '0.875em',
    fontStyle: 'italic',
    marginBottom: '2em',
    textAlign: 'left',
  },
  config: {
    '& > *:not(:last-child)': {
      marginBottom: '1.25em',
    },
  },
  format: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875em',
    marginBottom: '1.5em',
    '& > select': {
      width: '4em',
      borderBottom: 'none',
      padding: 0,
      fontSize: '1em',
      userSelect: 'none',
    },
  },
  slider: {
    width: '100%',
    display: 'inline-block',
  },
  button: {
    width: '100%',
    marginTop: '2em',
  },
}))

const FORMATS = ['png', 'svg']
const SCALE_RANGE = [1, 6]

const Download = () => {
  const dispatch = useDispatch()
  const repo = useRepo()
  const classes = useStyles()
  const [format, setFormat] = useState(FORMATS[0])
  const [scale, setScale] = useState(2)
  const { flash, aperture, transparent, getSvgUri, getPngUri } = useCamera()

  const setTransparent = useCallback(
    (transparent) => {
      dispatch(updateCamera({ transparent }))
    },
    [dispatch]
  )

  const savePng = useCallback(async () => {
    const dataUri = await getPngUri(scale)
    downloadDataUri(dataUri, `${repo.name}.png`)
  }, [getPngUri, scale, repo])

  const saveSvg = useCallback(async () => {
    const dataUri = await getSvgUri()
    downloadDataUri(dataUri, `${repo.name}.svg`)
  }, [repo, getSvgUri])

  const download = useCallback(async () => {
    await flash()
    ;({ svg: saveSvg, png: savePng }[format]())
  }, [flash, format, savePng, saveSvg])

  const renderDimensions = useCallback(() => {
    if (!aperture) return null
    const width = (aperture.screen.width * scale).toFixed(0)
    const height = (aperture.screen.height * scale).toFixed(0)
    return `${width} x ${height}`
  }, [aperture, scale])

  return (
    <div className={classes.root}>
      <div className={classes.instructions}>
        Download a snapshot of the main window.
      </div>
      <div className={classes.config}>
        <div className={classes.format}>
          <div>image format</div>
          <Select value={format} onChange={setFormat} options={FORMATS} />
        </div>
        {format !== 'svg' && (
          <Slider
            value={scale}
            onChange={setScale}
            range={SCALE_RANGE}
            label="dimensions"
            renderValue={renderDimensions}
          />
        )}
        <Checkbox
          label="transparent background"
          checked={transparent}
          onChange={setTransparent}
        />
      </div>
      <TextButton
        className={classes.button}
        label="download"
        onClick={download}
      />
    </div>
  )
}

export default Download
