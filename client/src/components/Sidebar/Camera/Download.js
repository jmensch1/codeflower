import React, { useCallback, useState, useEffect, useMemo } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { saveSvgAsPng } from 'save-svg-as-png'
import * as d3 from 'd3'
import { useRepo } from 'store/selectors'
import TextButton from 'components/core/TextButton'
import Slider from 'components/core/Slider'
import Checkbox from 'components/core/Checkbox'
import Select from 'components/core/Select'
import { useCamera } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
    '& > *': {
      marginBottom: '1.25em',
    }
  },
  instructions: {
    fontSize: '0.875em',
    fontStyle: 'italic',
    marginBottom: '2em',
    textAlign: 'left',
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
    }
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

const Download = ({ flash, transparent, setTransparent }) => {
  const repo = useRepo()
  const theme = useTheme()
  const classes = useStyles()
  const [svg, setSvg] = useState(null)
  const [format, setFormat] = useState(FORMATS[0])
  const [scale, setScale] = useState(2)
  const [showRepoInfo, setShowRepoInfo] = useState(true)
  const { aperture } = useCamera()

  useEffect(() => {
    setSvg(document.querySelector('#fdg-container svg'))
  }, [])

  const backgroundColor = useMemo(() => {
    return transparent ? 'transparent' : theme.palette.background.default
  }, [theme, transparent])

  useEffect(() => {
    if (!svg || !repo) return

    const repoInfo = d3
      .select(svg)
      .append('text')
      .attr('class', 'repo-info')
      .text(`${repo.owner} / ${repo.name}`)
      .style('fill', 'white')
      .style('font-size', 16)
      .style('font-family', 'sans-serif')
      .style('visibility', 'hidden')

    return () => repoInfo.remove()
  }, [svg, repo])

  useEffect(() => {
    if (!svg || !aperture) return

    const { left, top, height } = aperture.viewBox

    d3
      .select(svg)
      .select('.repo-info')
      .attr('x', left + 10)
      .attr('y', top + height - 10)
      .style('visibility', showRepoInfo ? 'visible' : 'hidden')
  }, [svg, showRepoInfo, aperture])

  const savePng = useCallback(() => {
    if (!svg || !aperture) return

    const { viewBox, ratio } = aperture
    const adjustedScale = scale / (window.devicePixelRatio * ratio)

    saveSvgAsPng(svg, `${repo.name}.png`, {
      ...viewBox,
      scale: adjustedScale,
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor,
    })
  }, [svg, aperture, scale, backgroundColor, repo])

  // http://bl.ocks.org/curran/7cf9967028259ea032e8
  const saveSvg = useCallback(() => {
    const origBackground = svg.style.backgroundColor
    svg.style.backgroundColor = backgroundColor

    const svgAsXML = (new XMLSerializer()).serializeToString(svg)
    const dataURL = "data:image/svg+xml," + encodeURIComponent(svgAsXML)

    const dl = document.createElement('a')
    document.body.appendChild(dl) // This line makes it work in Firefox.
    dl.setAttribute('href', dataURL)
    dl.setAttribute('download', `${repo.name}.svg`)
    dl.click()
    document.body.removeChild(dl)

    setTimeout(() => {
      svg.style.backgroundColor = origBackground
    })
  }, [svg, backgroundColor, repo])

  const download = useCallback(() => {
    flash()
    setTimeout(format === 'svg' ? saveSvg : savePng, 500)
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
      <div className={classes.format}>
        <div>image format</div>
        <Select
          value={format}
          onChange={setFormat}
          options={FORMATS}
        />
      </div>
      {format !== 'svg' && (
        <Slider
          value={scale}
          onChange={setScale}
          range={SCALE_RANGE}
          label='image dimensions'
          renderValue={renderDimensions}
        />
      )}
      <Checkbox
        label='transparent background'
        checked={transparent}
        onChange={setTransparent}
      />
      <Checkbox
        label='stamp owner/name'
        checked={showRepoInfo}
        onChange={setShowRepoInfo}
      />
      <TextButton
        className={classes.button}
        label='download'
        onClick={download}
      />
    </div>
  )
}

export default Download
