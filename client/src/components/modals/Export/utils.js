// returns the screen dimensions, viewBox dimensions, and ratio between them
export function getSvgDimensions(svg) {
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
