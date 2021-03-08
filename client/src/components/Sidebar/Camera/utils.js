export function svgToDataUri(svg, backgroundColor, viewBox) {
  const svgClone = svg.cloneNode(true)

  svgClone.removeAttribute('id')
  svgClone.removeAttribute('class')

  if (backgroundColor)
    svgClone.style.backgroundColor = backgroundColor

  // reset the viewbox so that png thumbnails look generally good
  if (viewBox) {
    const { left, top, width, height } = viewBox
    svgClone.setAttribute('viewBox', `${left} ${top} ${width} ${height}`)
  }

  const svgAsXML = (new XMLSerializer()).serializeToString(svgClone)
  return 'data:image/svg+xml;base64,' + btoa(svgAsXML)
}

export function downloadDataUri(dataUri, filename) {
  const dl = document.createElement('a')
  document.body.appendChild(dl) // This line makes it work in Firefox.
  dl.setAttribute('href', dataUri)
  dl.setAttribute('download', filename)
  dl.click()
  document.body.removeChild(dl)
}
