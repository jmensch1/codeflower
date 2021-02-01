import setWith from 'lodash/setWith'
import clone from 'lodash/clone'
import get from 'lodash/get'
import has from 'lodash/has'

export const delay = async (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

// splits an array into two arrays based on condition
// optionally transforms each element in each of the two arrays
export const partition = (
  arr,
  condition = (el) => true,
  transform = (el) => el
) => {
  const keep = []
  const reject = []
  arr.forEach((el) => {
    if (condition(el)) keep.push(transform(el))
    else reject.push(transform(el))
  })
  return [keep, reject]
}

// generates a multi-class-selector string
// e.g. multiClassSelector('.test-', [0, 1, 2])
// outputs '.test-0,.test-1,.test-2'
export const multiClassSelector = (base, spread) => {
  return spread.map((el) => `${base}${el}`).join(',')
}

// object accessors methods
// setPath returns the new object without mutating the original
// https://github.com/lodash/lodash/issues/1696
export const hasPath = has
export const getPath = get
export const setPath = (obj, path, val) => setWith(clone(obj), path, val, clone)

export const hueGradient = ({
  steps = 20,
  direction = 'right',
  saturation = 100,
  lightness = 50,
  alpha = 1.0,
  hueMin = 0,
  hueMax = 360,
} = {}) => {

  const inc = (hueMax - hueMin) / steps
  const colors = Array.from({ length: steps + 1 }).map((_, idx) => {
    return `hsla(${hueMin + inc * idx}, ${saturation}%, ${lightness}%, ${alpha})`
  }).join(', ')
  return `linear-gradient(to ${direction}, ${colors})`
}

export const alphaGradient = ({
  steps = 20,
  direction = 'right',
  saturation = 100,
  lightness = 50,
  hue = 0,
  alphaMin = 0,
  alphaMax = 1,
} = {}) => {
  const inc = (alphaMax - alphaMin) / steps
  const colors = Array.from({ length: steps + 1 }).map((_, idx) => {
    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alphaMin + inc * idx})`
  }).join(', ')
  return `linear-gradient(to ${direction}, ${colors})`
}

export const lightnessGradient = (steps = 20, direction = 'right') => {
  const inc = 100 / steps
  const colors = Array.from({ length: steps + 1 }).map((_, idx) => {
    return `hsl(0, 0%, ${inc * idx}%)`
  }).join(', ')
  return `linear-gradient(to ${direction}, ${colors})`
}

export const opacityGradient = (steps = 20, direction = 'right') => {
  const inc = 1 / steps
  const colors = Array.from({ length: steps + 1 }).map((_, idx) => {
    return `hsla(0, 0%, 100%, ${inc * idx})`
  }).join(', ')
  return `linear-gradient(to ${direction}, ${colors})`
}

export const colorString = (color) => {
  const { hue, saturation, lightness, alpha } = color
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}

export const isWithinFolder = (path, targetFolderPath) => (
  path.startsWith(`${targetFolderPath}/`) ||
  path === targetFolderPath
)

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
