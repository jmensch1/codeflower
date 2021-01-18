import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import RepoHeader from 'components/RepoInfo/RepoHeader'
import FolderButton from 'components/RepoInfo/FolderButton'
import LanguagesTable from 'components/RepoInfo/LanguagesTable'
import Folders from 'components/Sidebar/Folders'
import Authors from 'components/Sidebar/Authors'
import { useModal, useRepo } from 'store/selectors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: 350,
    backgroundColor: theme.palette.background.paper,
    height: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  tabs: {
    height: 5,
  },
  content: {
    flex: 1,
    overflow: 'auto',
  },
}))

const Aside = () => {
  const classes = useStyles()
  const repo = useRepo()
  let { params: { contentType } } = useModal('sidebar')
  contentType = contentType || 'languages'

  if (!repo) return null
  return (
    <div className={classes.root}>
      <RepoHeader />
      <div style={{ padding: 10 }}>
        <FolderButton />
      </div>
      <div className={classes.tabs} />
      <div className={classes.content}>
        <div
          id="vis-controls"
          style={{ display: contentType === 'controls' ? 'block' : 'none' }}
        />
        {(() => {
          switch(contentType) {
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
