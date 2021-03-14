// returns the dimensions of the largest possible rectangle,
// with the given aspect ratio, that fits within the given containerRect.
// Values are expressed in the screen coordinate system and are relative
// to the containerRect.
export function getAperture(containerRect, aspectRatio) {
  const {
    width: containerWidth,
    height: containerHeight,
  } = containerRect

  const containerAspectRatio = containerWidth / containerHeight

  const { width, height } = containerAspectRatio > aspectRatio
    ? {
      width: aspectRatio / containerAspectRatio,
      height: 1,
    } : {
      width: 1,
      height: containerAspectRatio / aspectRatio
    }

  const left = (1 - width) / 2
  const top = (1 - height) / 2

  return {
    left: left * containerWidth,
    top: top * containerHeight,
    width: width * containerWidth,
    height: height * containerHeight,
  }
}

// converts the given aperture to the svg's viewBox coordinate system
export function getViewboxAperture(svg, aperture) {
  const { left, top, width, height } = aperture
  const matrix = svg.getCTM().inverse()

  // calc top-left corner of aperture
  const pt0 = svg.createSVGPoint()
  pt0.x = left
  pt0.y = top
  const svgPt0 = pt0.matrixTransform(matrix)

  // calc bottom-right corner
  const pt1 = svg.createSVGPoint()
  pt1.x = left + width
  pt1.y = top + height
  const svgPt1 = pt1.matrixTransform(matrix)

  return {
    left: svgPt0.x,
    top: svgPt0.y,
    width: svgPt1.x - svgPt0.x,
    height: svgPt1.y - svgPt0.y,
  }
}
