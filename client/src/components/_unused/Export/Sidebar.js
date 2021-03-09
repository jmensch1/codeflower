import React, { useCallback } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { saveSvgAsPng } from 'save-svg-as-png'
import { getSvgDimensions } from './utils'
import Checkbox from 'components/core/Checkbox'
import Select from 'components/core/Select'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    padding: '1em',
    '& > *': {
      marginTop: '1.5em',
    }
  },
  button: {
    padding: '0.5em',
    border: `1px ${theme.palette.divider} solid`,
    borderRadius: '0.25em',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    }
  }
}))

const Sidebar = ({ settings, onChangeSettings }) => {
  const classes = useStyles()
  const theme = useTheme()

  // http://bl.ocks.org/curran/7cf9967028259ea032e8
  const saveSvg = useCallback(() => {
    const svg = document.querySelector('#export-container svg')
    const origBackground = svg.style.background
    svg.style.background = settings.transparent
      ? ''
      : theme.palette.background.default

    const svgAsXML = (new XMLSerializer()).serializeToString(svg)
    const dataURL = "data:image/svg+xml," + encodeURIComponent(svgAsXML)

    const dl = document.createElement('a')
    document.body.appendChild(dl) // This line makes it work in Firefox.
    dl.setAttribute('href', dataURL)
    dl.setAttribute('download', 'image.svg')
    dl.click()
    document.body.removeChild(dl)

    setTimeout(() => {
      svg.style.background = origBackground
    })
  }, [theme, settings])

  const savePng = useCallback(() => {
    const svg = document.querySelector('#export-container svg')
    const origBackground = svg.style.background
    svg.style.background = settings.transparent
      ? ''
      : theme.palette.background.default

    const scale = 2
    const { viewBox, ratio } = getSvgDimensions(svg)
    const adjustedScale = scale / (window.devicePixelRatio * ratio)

    saveSvgAsPng(svg, 'image.png', {
      ...viewBox,
      scale: adjustedScale,
      excludeCss: true,
      encoderOptions: 1.0,
    })

    setTimeout(() => {
      svg.style.background = origBackground
    })
  }, [theme, settings])

  return (
    <div className={classes.root}>
      <div className={classes.button} onClick={saveSvg}>Save SVG</div>
      <div className={classes.button} onClick={savePng}>Save PNG</div>
      <Checkbox
        label='transparent background'
        checked={settings.transparent}
        onChange={() => onChangeSettings({...settings, transparent: !settings.transparent })}
      />
      <Select
        value={settings.format}
        options={['png', 'svg']}
        onChange={(format) => onChangeSettings({...settings, format })}
      />
    </div>
  )
}

export default Sidebar
