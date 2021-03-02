import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
}))

const Sidebar = () => {
  const classes = useStyles()

  // http://bl.ocks.org/curran/7cf9967028259ea032e8
  const saveSvg = useCallback(() => {
    const svg = document.querySelector('#fdg-container svg')
    svg.style.backgroundColor = 'red'

    const svgAsXML = (new XMLSerializer()).serializeToString(svg)
    const dataURL = "data:image/svg+xml," + encodeURIComponent(svgAsXML)

    const dl = document.createElement("a")
    document.body.appendChild(dl) // This line makes it work in Firefox.
    dl.setAttribute("href", dataURL)
    dl.setAttribute("download", "test.svg")
    dl.click()
    document.body.removeChild(dl)
  }, [])

  return (
    <div className={classes.root}>
      <div onClick={saveSvg}>Save SVG</div>
    </div>
  )
}

export default Sidebar
