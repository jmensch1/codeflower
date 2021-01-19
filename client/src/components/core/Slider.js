import { withStyles } from '@material-ui/core/styles'
import MuiSlider from '@material-ui/core/Slider'

const Slider = withStyles((theme) => ({
  root: {
    color: 'white',
    marginBottom: 10,
  },
  valueLabel: {
    color: 'black',
  },
}))(MuiSlider)

export default Slider
