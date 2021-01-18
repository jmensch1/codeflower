import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RepoHeader from 'components/RepoInfo/RepoHeader'
// import FolderButton from 'components/RepoInfo/FolderButton'
import LanguagesTable from 'components/RepoInfo/LanguagesTable'
import Folders from 'components/Sidebar/Folders'
import Authors from 'components/Sidebar/Authors'
import { useRepo } from 'store/selectors'
import Tabs from './Tabs'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
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

const Aside = () => {
  const classes = useStyles()
  const repo = useRepo()
  const [tab, setTab] = useState('languages')

  if (!repo) return null
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <RepoHeader />
      </div>
      {/*<div style={{ padding: 10 }}>
        <FolderButton />
      </div>*/}
      <Tabs activeTab={tab} onChange={setTab} />
      <div className={classes.content}>
        <div
          id="vis-controls"
          style={{ display: tab === 'controls' ? 'block' : 'none' }}
        />
        {(() => {
          switch(tab) {
            case 'languages': return <LanguagesTable />
            case 'folders': return <Folders />
            case 'authors': return <Authors />
            default: return null
          }
        })()}
      </div>
    </div>
  )
}

export default Aside
