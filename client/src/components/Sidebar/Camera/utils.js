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

// const TARGET_WIDTH = 3000
//
// // eslint-disable-next-line
// const getPngUri = useCallback(async () => {
//   if (!svg || !aperture) return
//
//   const { viewBox } = aperture
//   const scale = TARGET_WIDTH / (viewBox.width * window.devicePixelRatio)
//
//   return svgAsPngUri(svg, {
//     ...viewBox,
//     scale,
//     excludeCss: true,
//     encoderOptions: 1.0,
//     backgroundColor: theme.palette.background.default,
//   })
// }, [svg, aperture, theme])

// const deleteAfterUpload = useCallback(() => {
//   deleteImage(uploadedImage.delete_token)
//     .then(() => setUploadedImage(null))
// }, [uploadedImage])

// useEffect(() => {
//   if (!svg || !repo) return
//
//   const repoInfo = d3
//     .select(svg)
//     .append('text')
//     .attr('class', 'repo-info')
//     .text(`${repo.owner} / ${repo.name}`)
//     .style('fill', 'white')
//     .style('font-size', 16)
//     .style('font-family', 'sans-serif')
//     .style('visibility', 'hidden')
//
//   return () => repoInfo.remove()
// }, [svg, repo])
//
// useEffect(() => {
//   if (!svg || !aperture) return
//
//   const { left, top, height } = aperture.viewBox
//
//   d3
//     .select(svg)
//     .select('.repo-info')
//     .attr('x', left + 10)
//     .attr('y', top + height - 10)
//     .style('visibility', showRepoInfo ? 'visible' : 'hidden')
// }, [svg, showRepoInfo, aperture])
