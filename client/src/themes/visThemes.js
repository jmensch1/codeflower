const visThemes = {
  periwinkle: {
    visualization: {
      default: {},
      force: {
        '& line.link': {
          fill: 'none',
          stroke: '#9ecae1',
          strokeWidth: 1,
        },
        '& .folder': {
          stroke: '#9ecae1',
          strokeWidth: 2,
          fill: '#ededed',
        },
        '& .file': {
          stroke: '#000',
          strokeWidth: 0.5,
        },
      },
      sunburst: {
        '& .folder': {
          stroke: '#9ecae1',
          strokeWidth: 0,
          fill: 'transparent',
        },
        '& .file': {
          stroke: 'white',
          strokeWidth: 0.1,
        },
      },
    },
    files: {
      highlighted: {},
      suppressed: { display: 'none' },
    },
    folders: {
      highlighted: {},
      suppressed: { display: 'none' },
    },
    links: {
      highlighted: {},
      suppressed: { strokeOpacity: 0.2 },
    },
    languageColor: (languages, index) => {
      const hue = 170 + Math.round((190 * index) / languages.length)
      return `hsl(${hue}, 100%, 50%)`
    },
  },
  bumblebee: {
    visualization: {
      default: {},
      force: {
        '& line.link': {
          fill: 'none',
          stroke: '#9ecae1',
          strokeWidth: 0.5,
        },
        '& .folder': {
          stroke: '#9ecae1',
          strokeWidth: 0,
          fill: '#F5EA14',
        },
        '& .file': {
          stroke: '#ccc',
          strokeWidth: 0.5,
        },
      },
      sunburst: {
        '& .folder': {
          stroke: '#9ecae1',
          strokeWidth: 0.5,
          fill: 'transparent',
        },
        '& .file': {
          stroke: 'white',
          strokeWidth: 0.1,
        },
      },
    },
    files: {
      highlighted: { fill: 'red !important' },
      suppressed: {},
    },
    folders: {
      highlighted: {},
      suppressed: { display: 'none' },
    },
    links: {
      highlighted: {},
      suppressed: { strokeOpacity: 0.2 },
    },
    languageColor: (languages, index) => {
      return 'transparent'
    },
  },
  rainbow: {
    visualization: {
      default: {},
      force: {
        '& line.link': {
          fill: 'none',
          strokeWidth: 0,
        },
        '& .folder': {
          strokeWidth: 0,
          fill: 'none',
        },
        '& .file': {
          stroke: '#000',
          strokeWidth: 0,
        },
      },
      sunburst: {
        '& .folder': {
          stroke: '#9ecae1',
          strokeWidth: 0,
          fill: 'transparent',
        },
        '& .file': {
          stroke: 'white',
          strokeWidth: 0,
        },
      },
    },
    files: {
      highlighted: {},
      suppressed: { display: 'none' },
    },
    folders: {
      highlighted: {},
      suppressed: { display: 'none' },
    },
    links: {
      highlighted: {},
      suppressed: {},
    },
    languageColor: (languages, index) => {
      const hue = Math.round((360 * index) / languages.length)
      return `hsl(${hue}, 90%, 70%)`
    },
  },
}

export default visThemes
