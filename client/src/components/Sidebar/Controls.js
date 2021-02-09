import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SubTabs from './SubTabs'
import ForceControls from 'components/Visualization/ForceDirectedGraph/controls/ForceControls'
import StyleControls from 'components/Visualization/ForceDirectedGraph/controls/StyleControls'
import PositionControls from 'components/Visualization/ForceDirectedGraph/controls/PositionControls'
import ThemeControls from 'components/ThemeControls'
// import ColorPicker from 'components/core/ColorPicker'
// import Swatch from 'components/core/Swatch'
// import GradientPicker from 'components/core/GradientPicker'
// import Swatches from 'components/core/Swatches'

//////////////////// TAB CONFIG ///////////////////

// const Test = () => {
//   const [color, setColor] = useState({
//     hue: [150, 360],
//     saturation: 100,
//     lightness: 50,
//     alpha: 0.8,
//   })
//
//   return (
//     <>
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'flex-end',
//           marginBottom: 10,
//         }}
//       >
//         <Swatches color={color} />
//       </div>
//       <GradientPicker color={color} onChange={setColor} />
//     </>
//   )
// }

const TABS = [
  // {
  //   type: 'test',
  //   Component: Test,
  // },
  {
    type: 'forces',
    Component: ForceControls,
  },
  {
    type: 'styles',
    Component: StyleControls,
  },
  {
    type: 'position',
    Component: PositionControls,
  },
  {
    type: 'other',
    Component: ThemeControls,
  },
]

/////////////////////// COMPONENT ////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  tabs: {
    padding: '0 10px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: 20,
  },
}))

const Controls = () => {
  const classes = useStyles()
  const [tab, setTab] = useState('forces')
  const { Component } = TABS.find((t) => t.type === tab)

  return (
    <div className={classes.root}>
      <div className={classes.tabs}>
        <SubTabs tabs={TABS} activeTab={tab} onChange={setTab} />
      </div>
      <div className={classes.content}>
        <Component />
      </div>
    </div>
  )
}

export default Controls
