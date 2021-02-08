import tinycolor from 'tinycolor2'

export const colorString = (color) => {
  const { hue, saturation, lightness, alpha } = color
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}

//// GRADIENTS ////

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
  const colors = Array.from({ length: steps + 1 })
    .map((_, idx) => {
      return `hsla(${
        hueMin + inc * idx
      }, ${saturation}%, ${lightness}%, ${alpha})`
    })
    .join(', ')
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
  const colors = Array.from({ length: steps + 1 })
    .map((_, idx) => {
      return `hsla(${hue}, ${saturation}%, ${lightness}%, ${
        alphaMin + inc * idx
      })`
    })
    .join(', ')
  return `linear-gradient(to ${direction}, ${colors})`
}

// gradient from https://hslpicker.com/
export const checkerGradient = ({
  alpha = 1,
  size = 20,
  backgroundColor = 'hsla(0,0%,0%,1)',
} = {}) => {
  const isDarkBackground = tinycolor(backgroundColor).toHsl().l < 0.5
  const lightness = isDarkBackground ? 100 : 0

  return `
    linear-gradient(
      45deg,
        hsla(0,0%,${lightness}%,${alpha}) 25%,
        transparent 25%,
        transparent 75%,
        hsla(0,0%,${lightness}%,${alpha}) 75%,
        hsla(0,0%,${lightness}%,${alpha})
    ) 0px 0px / ${size}px ${size}px
    ,
    linear-gradient(
      45deg,
        hsla(0,0%,${lightness}%,${alpha}) 25%,
        transparent 25%,
        transparent 75%,
        hsla(0,0%,${lightness}%,${alpha}) 75%,
        hsla(0,0%,${lightness}%,${alpha})
    ) ${size / 2}px ${size / 2}px / ${size}px ${size}px
  `
}

// export const lightnessGradient = (steps = 20, direction = 'right') => {
//   const inc = 100 / steps
//   const colors = Array.from({ length: steps + 1 })
//     .map((_, idx) => {
//       return `hsl(0, 0%, ${inc * idx}%)`
//     })
//     .join(', ')
//   return `linear-gradient(to ${direction}, ${colors})`
// }
//
// export const opacityGradient = (steps = 20, direction = 'right') => {
//   const inc = 1 / steps
//   const colors = Array.from({ length: steps + 1 })
//     .map((_, idx) => {
//       return `hsla(0, 0%, 100%, ${inc * idx})`
//     })
//     .join(', ')
//   return `linear-gradient(to ${direction}, ${colors})`
// }

//// COLOR CONVERSION ////
// functions from npm color-convert

export function hslToHsv(hsl) {
  const h = hsl[0]
  let s = hsl[1] / 100
  let l = hsl[2] / 100
  let smin = s
  const lmin = Math.max(l, 0.01)

  l *= 2
  s *= l <= 1 ? l : 2 - l
  smin *= lmin <= 1 ? lmin : 2 - lmin
  const v = (l + s) / 2
  const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)

  return [h, sv * 100, v * 100]
}

export function hsvToHsl(hsv) {
  const h = hsv[0]
  const s = hsv[1] / 100
  const v = hsv[2] / 100
  const vmin = Math.max(v, 0.01)
  let sl
  let l

  l = (2 - s) * v
  const lmin = (2 - s) * vmin
  sl = s * vmin
  sl /= lmin <= 1 ? lmin : 2 - lmin
  sl = sl || 0
  l /= 2

  return [h, sl * 100, l * 100]
}
