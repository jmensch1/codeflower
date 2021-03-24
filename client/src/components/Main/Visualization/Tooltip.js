import React, { createContext, useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const tooltipContext = createContext()

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: '5px',
    padding: '5px 10px',
    transform: 'translate(-50%, -150%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
}))

export const TooltipProvider = ({ children }) => {
  const classes = useStyles()
  const [tooltip, setTooltip] = useState(null)

  return (
    <>
      {tooltip && (
        <div
          className={classes.root}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}
      <tooltipContext.Provider value={setTooltip}>
        {children}
      </tooltipContext.Provider>
    </>
  )
}

export const useTooltip = () => {
  return useContext(tooltipContext)
}
