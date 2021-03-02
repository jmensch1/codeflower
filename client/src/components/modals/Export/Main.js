import React, { useEffect, useRef } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'

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
    }
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    display: 'block',
  },
}))

const Main = () => {
  const classes = useStyles()
  const svgContainer = useRef(null)
  const theme = useTheme()

  useEffect(() => {
    const svg = document.querySelector('#fdg-container svg')
    const svgClone = svg.cloneNode(true)
    svgClone.style.backgroundColor = theme.palette.background.default
    svgContainer.current.appendChild(svgClone)
  }, [theme])

  return (
    <div className={classes.root}>
      <div
        className={classes.inner}
        id="export-container"
        ref={svgContainer}
      />
    </div>
  )
}

export default Main
