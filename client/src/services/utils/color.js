import tinycolor from 'tinycolor2'

export function getLightness(color) {
  return tinycolor(color).toHsl().l * 100
}

export function getAlpha(color) {
  return tinycolor(color).getAlpha()
}

// convert string to object
export function colorObject(color) {
  const parsed = tinycolor(color).toHsl()
  return {
    hue: parsed.h,
    saturation: parsed.s * 100,
    lightness: parsed.l * 100,
    alpha: parsed.a,
  }
}

// convert object to string
export function colorString(color) {
  const { hue, saturation, lightness, alpha } = color
  return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}

export function colorArray(
  { hueRange: [min, max], saturation, lightness, alpha },
  numColors
) {
  if (numColors < 1) return []

  const inc = numColors === 1 ? 0 : (max - min) / (numColors - 1)
  return Array.from({ length: numColors }).map((_, idx) =>
    colorString({
      hue: min + inc * idx,
      saturation,
      lightness,
      alpha,
    })
  )
}

//// GRADIENTS ////

export function hueGradient({
  direction = 'right',
  hueRange = [0, 360],
  saturation = 100,
  lightness = 50,
  alpha = 1,
  steps = 20,
} = {}) {
  return `
    linear-gradient(
      to ${direction},
        ${colorArray(
          {
            hueRange,
            saturation,
            lightness,
            alpha,
          },
          steps
        )}
    )
  `
}

export function alphaGradient({
  direction = 'right',
  hue = 0,
  saturation = 100,
  lightness = 50,
} = {}) {
  return `
    linear-gradient(
      to ${direction},
        hsla(${hue}, ${saturation}%, ${lightness}%, 0),
        hsla(${hue}, ${saturation}%, ${lightness}%, 1)
    )
  `
}

export function lightnessGradient({ direction = 'right', alpha = 1 } = {}) {
  return `
    linear-gradient(
      to ${direction},
        hsla(0, 0%, 0%, ${alpha}) 0%,
        hsla(0, 0%, 0%, 0) 50%,
        hsla(0, 0%, 100%, 0) 50%,
        hsla(0, 0%, 100%, ${alpha}) 100%
    )
  `
}

export function grayscaleGradient({ direction = 'right', alpha = 1 } = {}) {
  return `
    linear-gradient(
      to ${direction},
        hsla(0, 0%, 0%, ${alpha}),
        hsla(0, 0%, 100%, ${alpha})
    )
  `
}

// gradient from https://hslpicker.com/
export function checkerGradient({
  alpha = 1,
  size = 20,
  backgroundColor = 'hsla(0,0%,0%,1)',
} = {}) {
  const isDarkBackground = getLightness(backgroundColor) <= 50
  const lightness = isDarkBackground ? 100 : 0

  return `
    linear-gradient(
      45deg,
        hsla(0, 0%, ${lightness}%, ${alpha}) 25%,
        transparent 25%,
        transparent 75%,
        hsla(0, 0%, ${lightness}%, ${alpha}) 75%,
        hsla(0, 0%, ${lightness}%, ${alpha})
    ) 0px 0px / ${size}px ${size}px
    ,
    linear-gradient(
      45deg,
        hsla(0, 0%, ${lightness}%, ${alpha}) 25%,
        transparent 25%,
        transparent 75%,
        hsla(0, 0%, ${lightness}%, ${alpha}) 75%,
        hsla(0, 0%, ${lightness}%, ${alpha})
    ) ${size / 2}px ${size / 2}px / ${size}px ${size}px
  `
}

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
