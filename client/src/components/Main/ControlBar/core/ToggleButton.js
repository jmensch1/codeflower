import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ToggleButton from '@material-ui/lab/ToggleButton'
import Tooltip from '@material-ui/core/Tooltip'

const StyledToggleButton = withStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
    border: 'none',
  },
}))(ToggleButton)

const Toggle = ({ value, onChange, buttons }) => {
  const buttonIdx = buttons.findIndex((button) => button.value === value)
  const nextIdx = (buttonIdx + 1) % buttons.length
  const button = buttons[buttonIdx]
  const { Icon } = button
  return (
    <StyledToggleButton
      size="small"
      value=""
      onClick={() => onChange(buttons[nextIdx].value)}
    >
      <Tooltip title={button.text} placement="left">
        <Icon />
      </Tooltip>
    </StyledToggleButton>
  )
}

export default Toggle
