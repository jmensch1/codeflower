import React, { useEffect, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { checkerGradient } from 'services/utils/color'

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
  inner: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2em',
    '& svg': {
      maxHeight: '100%',
      maxWidth: '100%',
      display: 'block',
    },
  },
}))

const Main = ({ settings }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [svg, setSvg] = useState(null)

  useEffect(() => {
    const svg = document.querySelector('#fdg-container svg')
    const svgContainer = document.querySelector('#export-container')
    const svgClone = svg.cloneNode(true)
    svgContainer.appendChild(svgClone)
    setSvg(svgClone)
    return () => svgContainer.innerHTML = ''
  }, [])

  useEffect(() => {
    if (!svg) return

    svg.style.background = settings.transparent
      ? checkerGradient({ alpha: 0.05 })
      : theme.palette.background.default
  }, [svg, theme, settings])

  return (
    <div className={classes.root}>
      <div
        className={classes.inner}
        id="export-container"
      />
    </div>
  )
}

export default Main
