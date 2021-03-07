import React, { useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { imageUrl } from 'services/gallery'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
    '& svg': {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    }
  },
}))

async function urlToSvg(url) {
  const { data: xml } = await axios.get(url)
  const dom = new DOMParser()
  const svg = dom.parseFromString(xml, 'image/svg+xml')
  svg.rootElement.removeAttribute('id') // TODO: maybe remove id before upload?
  return svg.rootElement
}

const Main = ({ image }) => {
  const classes = useStyles()
  const container = useRef(null)

  useEffect(() => {
    if (!image) return

    const prevSvg = container.current.querySelector('svg')
    urlToSvg(imageUrl(image)).then(svg => {
      container.current.appendChild(svg)
      if (prevSvg) container.current.removeChild(prevSvg)
    })
  }, [image])

  return <div className={classes.root} ref={container} />
}

export default Main
