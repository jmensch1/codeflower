const themes = {
  periwinkle: {
    visualization: {
      default: {
        // backgroundColor: 'black',
      },
      force: {
        '& line.link': {
          fill: 'none',
          stroke: '#9ecae1',
          strokeWidth: 1.5,
        },
        '& .directory': {
          stroke: '#9ecae1',
          strokeWidth: 2,
          fill: '#ededed',
        },
        '& .file': {
          stroke: '#000',
          strokeWidth: 0.5,
        },
        '& .nodetext': {
          fill: '#252929',
          fontWeight: 'bold',
        },
      },
      sunburst: {
        '& .directory': {
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
    languages: {
      color: (languages, index) => {
        const hue = 170 + Math.round(190 * index / languages.length)
        return `hsl(${hue}, 100%, 50%)`
      },
      highlight: (language) => {
        return {}
      },
      suppress: (language) => {
        return { display: 'none' }
      },
    },
  },
  bumblebee: {
    visualization: {
      default: {
        // backgroundColor: 'black',
      },
      force: {
        '& line.link': {
          fill: 'none',
          stroke: '#9ecae1',
          strokeWidth: 0.5,
        },
        '& .directory': {
          stroke: '#9ecae1',
          strokeWidth: 0,
          fill: '#F5EA14',
        },
        '& .file': {
          stroke: '#ccc',
          strokeWidth: 0.5,
        },
        '& .nodetext': {
          fill: 'white',
          fontWeight: 'bold',
        },
      },
      sunburst: {
        '& .directory': {
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
    languages: {
      color: (languages, index) => {
        return 'transparent'
      },
      highlight: (language) => {
        return { fill: 'red !important' }
      },
      suppress: (language) => {
        return {}
      },
    },
  },
  rainbow: {
    visualization: {
      default: {
        // backgroundColor: '#333',
      },
      force: {
        '& line.link': {
          fill: 'none',
          strokeWidth: 0,
        },
        '& .directory': {
          strokeWidth: 0,
          fill: 'none',
        },
        '& .file': {
          stroke: '#000',
          strokeWidth: 0,
        },
        '& .nodetext': {
          fill: 'white',
          fontWeight: 'bold',
        },
      },
      sunburst: {
        '& .directory': {
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
    languages: {
      color: (languages, index) => {
        const hue = Math.round(360 * index / languages.length)
        return `hsl(${hue}, 90%, 70%)`
      },
      highlight: (language) => {
        return {}
      },
      suppress: (language) => {
        return { display: 'none' }
      },
    },
  },
}

export default themes
