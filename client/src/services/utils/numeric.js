export const clamp = (num, range) => {
  let [min, max] = range
  if (max < min) [min, max] = [max, min]
  return Math.min(Math.max(num, min), max)
}

// clamps x1 and x2 within xRange while maintaining the distance between them
export const clampBar = (x1, x2, xRange) => {
  const xDistance = x2 - x1

  x1 = clamp(x1, xRange)
  x2 = x1 + xDistance

  x2 = clamp(x2, xRange)
  x1 = x2 - xDistance

  return [x1, x2]
}

export const interpolate = (num, domain, range, useClamp = false) => {
  const domainRatio = (num - domain[0]) / (domain[1] - domain[0])
  const targetValue = domainRatio * (range[1] - range[0]) + range[0]
  return useClamp ? clamp(targetValue, range) : targetValue
}
