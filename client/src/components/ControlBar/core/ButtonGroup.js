import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import Tooltip from '@material-ui/core/Tooltip'

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    margin: theme.spacing(0.5),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup)

const ButtonGroup = ({ value, onChange, buttons }) => (
  <StyledToggleButtonGroup
    size='small'
    value={value}
    exclusive
    onChange={(e, val) => val && onChange(val)}
    orientation='vertical'
  >
    {buttons.map((button, idx) => {
      const { Icon } = button
      return (
        <ToggleButton key={button.value} value={button.value}>
          <Tooltip title={button.text} placement='right'>
            <Icon />
          </Tooltip>
        </ToggleButton>
      )
    })}
  </StyledToggleButtonGroup>
)

export default ButtonGroup
