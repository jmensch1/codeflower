const DEFAULT_COEFF = 3.0
const DEFAULT_EXPONENT = 0.25

const periwinkle = {
  id: 'periwinkle',
  files: {
    visible: true,
    fill: {
      hueRange: [170, 360],
      saturation: 100,
      lightness: 50,
      alpha: 0.9,
    },
    stroke: {
      hue: 0,
      saturation: 0,
      lightness: 0,
      alpha: 1.0,
    },
    strokeWidth: 0.5,
    radius: {
      coeff: DEFAULT_COEFF,
      exponent: DEFAULT_EXPONENT,
    },
  },
  folders: {
    visible: true,
    fill: {
      hue: 0,
      saturation: 0,
      lightness: 93,
      alpha: 1.0,
    },
    stroke: {
      hue: 201,
      saturation: 53,
      lightness: 75,
      alpha: 1.0,
    },
    strokeWidth: 2,
    radius: 3.5,
  },
  links: {
    visible: true,
    stroke: {
      hue: 201,
      saturation: 53,
      lightness: 73,
      alpha: 1.0,
    },
    strokeWidth: 1,
  },
  background: {
    fill: {
      hue: 216,
      saturation: 28,
      lightness: 7,
      alpha: 1,
    },
  },
}

const bumblebee = {
  id: 'bumblebee',
  files: {
    visible: true,
    fill: {
      hueRange: [57, 57],
      saturation: 92,
      lightness: 52,
      alpha: 0,
    },
    stroke: {
      hue: 0,
      saturation: 0,
      lightness: 80,
      alpha: 1.0,
    },
    strokeWidth: 0.5,
    radius: {
      coeff: DEFAULT_COEFF,
      exponent: DEFAULT_EXPONENT,
    },
  },
  folders: {
    visible: true,
    fill: {
      hue: 57,
      saturation: 92,
      lightness: 52,
      alpha: 1.0,
    },
    stroke: {
      hue: 201,
      saturation: 53,
      lightness: 75,
      alpha: 1.0,
    },
    strokeWidth: 0,
    radius: 3.5,
  },
  links: {
    visible: true,
    stroke: {
      hue: 0,
      saturation: 0,
      lightness: 80,
      alpha: 1.0,
    },
    strokeWidth: 0.5,
  },
  background: {
    fill: {
      hue: 216,
      saturation: 28,
      lightness: 7,
      alpha: 1,
    },
  },
}

const rainbow = {
  id: 'rainbow',
  files: {
    visible: true,
    fill: {
      hueRange: [0, 360],
      saturation: 90,
      lightness: 70,
      alpha: 1.0,
    },
    stroke: {
      hue: 0,
      saturation: 0,
      lightness: 0,
      alpha: 1.0,
    },
    strokeWidth: 0,
    radius: {
      coeff: DEFAULT_COEFF,
      exponent: DEFAULT_EXPONENT,
    },
  },
  folders: {
    visible: false,
    fill: {
      hue: 0,
      saturation: 0,
      lightness: 93,
      alpha: 1.0,
    },
    stroke: {
      hue: 201,
      saturation: 53,
      lightness: 75,
      alpha: 1.0,
    },
    strokeWidth: 2,
    radius: 3.5,
  },
  links: {
    visible: false,
    stroke: {
      hue: 201,
      saturation: 53,
      lightness: 75,
      alpha: 1.0,
    },
    strokeWidth: 1,
  },
  background: {
    fill: {
      hue: 216,
      saturation: 28,
      lightness: 7,
      alpha: 1,
    },
  },
}

const visThemes = {
  periwinkle,
  bumblebee,
  rainbow,
}

export default visThemes
