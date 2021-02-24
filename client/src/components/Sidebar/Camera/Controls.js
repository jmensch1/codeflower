import React, { useCallback, useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import {
  saveSvgAsPng,
  svgAsDataUri,
} from 'save-svg-as-png'
import TextButton from 'components/core/TextButton'
import Slider from 'components/core/Slider'
import * as d3 from 'd3'
import { useRepo } from 'store/selectors'
import Checkbox from 'components/core/Checkbox'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    textAlign: 'center',
  },
  preview: {
    display: 'inline-block',
    maxWidth: '100%',
    maxHeight: 300,
  },
  dimensions: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  slider: {
    marginTop: 20,
    width: 200,
    display: 'inline-block',
  },
  buttons: {
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}))

const nearestEven = (x) => 2 * Math.round(x / 2)

// returns the screen dimensions, viewBox dimensions, and ratio between them
function getSvgDimensions(svg) {
  const screen = svg.getBoundingClientRect()
  const matrix = svg.getCTM().inverse()

  // top-left corner of svg
  const pt0 = svg.createSVGPoint()
  pt0.x = 0
  pt0.y = 0
  const svgPt0 = pt0.matrixTransform(matrix)

  // bottom-right corner
  const pt1 = svg.createSVGPoint()
  pt1.x = screen.width
  pt1.y = screen.height
  const svgPt1 = pt1.matrixTransform(matrix)

  const viewBox = {
    left: svgPt0.x,
    top: svgPt0.y,
    width: svgPt1.x - svgPt0.x,
    height: svgPt1.y - svgPt0.y,
  }

  return {
    screen,
    viewBox,
    ratio: viewBox.width / screen.width,
  }
}

const CameraControls = ({ flash }) => {
  const theme = useTheme()
  const classes = useStyles()
  const [svg, setSvg] = useState(null)
  const [svgDimensions, setSvgDimensions] = useState(null)
  const [dataUri, setDataUri] = useState(null)
  const [scale, setScale] = useState(1)
  const repo = useRepo()
  const [showRepoInfo, setShowRepoInfo] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setSvg(document.querySelector('#fdg-container svg'))
    })
  }, [])

  useEffect(() => {
    if (!svg) return

    const observer = new ResizeObserver(() => {
      setSvgDimensions(getSvgDimensions(svg))
    })

    observer.observe(document.querySelector('#fdg-container'))

    return () => observer.disconnect()
  }, [svg])

  useEffect(() => {
    if (!svg) return

    const repoName = `${repo.owner} / ${repo.name} (${repo.branch})`
    const repoInfo = d3.select(svg)
      .append('text')
      .attr('class', 'repo-info')
      .text(repoName)
      .style('fill', 'white')
      .style('font-size', 16)
      .style('font-family', 'sans-serif')
      .style('visibility', 'hidden')

    return () => repoInfo.remove()
  }, [svg, repo])

  useEffect(() => {
    if (!svg || !svgDimensions) return

    const { left, top, height } = svgDimensions.viewBox

    d3
      .select(svg)
      .select('.repo-info')
      .attr('x', left + 10)
      .attr('y', top + height - 10)
      .style('visibility', showRepoInfo ? 'visible' : 'hidden')
  }, [svg, showRepoInfo, svgDimensions])

  const setPreview = useCallback(() => {
    if (!svg || !svgDimensions) return

    const { viewBox, ratio } = svgDimensions
    const adjustedScale = scale / (window.devicePixelRatio * ratio)

    svgAsDataUri(svg, {
      ...viewBox,
      scale: adjustedScale,
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
    }).then(setDataUri)
  }, [svg, scale, theme, svgDimensions])

  const saveImage = useCallback(() => {
    if (!svg || !svgDimensions) return

    const { viewBox, ratio } = svgDimensions
    const adjustedScale = scale / (window.devicePixelRatio * ratio)

    saveSvgAsPng(svg, 'image.png', {
      ...viewBox,
      scale: adjustedScale,
      excludeCss: true,
      encoderOptions: 1.0,
      backgroundColor: theme.palette.background.default,
    })
  }, [svg, scale, theme, svgDimensions])

  const takeSnapshot = useCallback(() => {
    flash()
    setTimeout(saveImage, 500)
  }, [flash, saveImage])

  if (!svgDimensions) return null
  return (
    <div className={classes.root}>
      <img alt='preview' className={classes.preview} src={dataUri} />
      <div className={classes.dimensions}>
        <span>width: {nearestEven(svgDimensions.screen.width * scale)}</span>
        <span>height: {nearestEven(svgDimensions.screen.height * scale)}</span>
      </div>
      <div className={classes.slider}>
        <Slider
          value={scale}
          onChange={setScale}
          range={[0.2, 5, 0.2]}
          label='scale'
          renderValue={x => x.toFixed(2)}
        />
      </div>
      <div className={classes.showRepoInfo}>
        <Checkbox
          label='show repo owner/name'
          checked={showRepoInfo}
          onChange={setShowRepoInfo}
        />
      </div>
      <div className={classes.buttons}>
        <TextButton label='preview' onClick={setPreview} />
        <TextButton label='save' onClick={takeSnapshot} />
      </div>
    </div>
  )
}

export default CameraControls
