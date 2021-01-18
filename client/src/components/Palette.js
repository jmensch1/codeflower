import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import MuiSlider from '@material-ui/core/Slider'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const Slider = withStyles((theme) => ({
  root: {
    color: 'white',
    marginBottom: 10,
  },
  valueLabel: {
    color: 'black',
  },
}))(MuiSlider)

function hexToHSL(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);

    r /= 255
    g /= 255
    b /= 255
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max === min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            default: break;
        }
        h /= 6;
    }

    s = s*100;
    s = Math.round(s);
    l = l*100;
    l = Math.round(l);
    h = Math.round(360*h);

    return {
      h,
      s,
      l,
    }
}



const Palette = ({ palette, onChange }) => {
  const classes = useStyles()

  const color = palette.background.default

  const lightness = color.startsWith('#')
    ? hexToHSL(color).l
    : +/.*?hsl\((\d+),(\d+)%,(\d+)%\)/.exec(color)[3]

  return (
    <div className={classes.root}>
      <label>main background ({lightness})</label>
      <Slider
        min={0}
        max={100}
        value={lightness}
        onChange={(e, newVal) => {
          onChange({
            ...palette,
            background: {
              ...palette.background,
              default: `hsl(0,0%,${newVal}%)`,
            },
          })
        }}
      />
    </div>
  )
}

export default Palette
