import React, { createContext, useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const tooltipContext = createContext()

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: ({ y }) => y,
    left: ({ x }) => x,
    visibility: ({ visible }) => (visible ? 'visible' : 'hidden'),
    backgroundColor: '#3d3d3d',
    color: 'white',
    borderRadius: '5px',
    padding: '5px 10px',
    transform: 'translate(-50%, -150%)',
    pointerEvents: 'none',
    zIndex: 1,
  },
}))

export const TooltipProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState(null)

  const classes = useStyles({
    visible: !!tooltip,
    x: tooltip?.x,
    y: tooltip?.y,
  })

  return (
    <>
      <div className={classes.root}>{tooltip?.content}</div>
      <tooltipContext.Provider value={setTooltip}>
        {children}
      </tooltipContext.Provider>
    </>
  )
}

export const useTooltip = () => {
  return useContext(tooltipContext)
}
