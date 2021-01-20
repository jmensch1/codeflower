import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useRepo } from 'store/selectors'
import Header from './Header'
import Tabs from './Tabs'
import Languages from './Languages'
import Folders from './Folders'
import Authors from './Authors'
import ForceControls from 'components/Visualization/ForceDirectedGraph/ForceControls'
import StyleControls from 'components/Visualization/ForceDirectedGraph/StyleControls'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRight: `1px ${theme.palette.divider} solid`,
  },
  header: {
    padding: '10px 10px 15px 10px',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: 10,
  },
}))

const Sidebar = () => {
  const classes = useStyles()
  const repo = useRepo()
  const [tab, setTab] = useState('languages')

  if (!repo) return null
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Header />
      </div>
      <Tabs activeTab={tab} onChange={setTab} />
      <div className={classes.content}>
        <div
          id="palette-controls"
          style={{ display: tab === 'palette' ? 'block' : 'none' }}
        />
        {(() => {
          switch(tab) {
            case 'languages': return <Languages />
            case 'folders': return <Folders />
            case 'authors': return <Authors />
            case 'controls': return (
              <>
                <ForceControls />
                <StyleControls />
              </>
            )
            default: return null
          }
        })()}
      </div>
    </div>
  )
}

export default Sidebar
