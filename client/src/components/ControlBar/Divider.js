import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'

const StyledDivider = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1, 0.5),
  },
}))(Divider)

export default StyledDivider
