import tinycolor from 'tinycolor2'

export const colorString = (color) => {
  const { hue, saturation, lightness, alpha } = color
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}

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
