const periwinkle = {
  rotation: 0,
  files: {
    fill: {
      hue: [170, 360],
      saturation: 100,
      lightness: 50,
      alpha: 1.0,
    },
    stroke: '#000',
    strokeWidth: 0.5,
    radius: {
      coeff: 1.0,
      exponent: 0.4,
    },
  },
  folders: {
    fill: '#ededed',
    stroke: '#9ecae1',
    strokeWidth: 2,
  },
  links: {
    stroke: '#9ecae1',
    strokeWidth: 1,
  },
}

const bumblebee = {
  rotation: 0,
  files: {
    fill: {
      hue: [57, 57],
      saturation: 92,
      lightness: 52,
      alpha: 0,
    },
    stroke: '#ccc',
    strokeWidth: 0.5,
    radius: {
      coeff: 1.0,
      exponent: 0.4,
    },
  },
  folders: {
    fill: '#f5ea14',
    stroke: '#9ecae1',
    strokeWidth: 0,
  },
  links: {
    stroke: '#ccc',
    strokeWidth: 0.5,
  },
}

const rainbow = {
  rotation: 0,
  files: {
    fill: {
      hue: [0, 360],
      saturation: 90,
      lightness: 70,
      alpha: 1.0,
    },
    stroke: '#000',
    strokeWidth: 0,
    radius: {
      coeff: 1.0,
      exponent: 0.4,
    },
  },
  folders: {
    fill: 'rgba(0,0,0,0)',
    stroke: '#9ecae1',
    strokeWidth: 0,
  },
  links: {
    stroke: '#9ecae1',
    strokeWidth: 0,
  },
}

const visThemes = {
  periwinkle,
  bumblebee,
  rainbow,
}

export default visThemes
