const themes = {
  periwinkle: {
    visualization: {
      default: {
        backgroundColor: 'black',
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
    dynamic: {
      nodeColor: (languages, index) => {
        var total = languages.length
        var hue = 170 + Math.round(190 * index / total)
        return `hsl(${hue}, 100%, 50%)`
      },
      highlightNode: (language) => {
        return {}
      },
      suppressNode: (language) => {
        return { display: 'none' }
      },
    },
  },
  bumblebee: {
    visualization: {
      default: {
        backgroundColor: 'black',
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
    dynamic: {
      nodeColor: (languages, index) => {
        return 'black'
      },
      highlightNode: (language) => {
        return { fill: 'red !important' }
      },
      suppressNode: (language) => {
        return {}
      },
    },
  },
  rainbow: {
    visualization: {
      default: {
        backgroundColor: '#333',
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
          strokeWidth: 0,
          fill: 'transparent',
        },
        '& .file': {
          stroke: 'white',
          strokeWidth: 0,
        },
      },
    },
    dynamic: {
      nodeColor: (languages, index) => {
        var total = languages.length
        var hue = Math.round(360 * index / total)
        return `hsl(${hue}, 90%, 70%)`
      },
      highlightNode: (language) => {
        return {}
      },
      suppressNode: (language) => {
        return { display: 'none' }
      },
    },
  },
}

export default themes
