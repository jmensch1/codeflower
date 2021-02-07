import React, { useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useVisStyles } from 'store/selectors'
import { updateVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import Checkbox from 'components/core/Checkbox'
import FileControls from './FileControls'
import FolderControls from './FolderControls'
import LinkControls from './LinkControls'
import Row from '../Row'
import { getPaths, createUpdaters } from 'services/utils'

const useStyles = makeStyles((theme) => ({
  root: {},
}))

const PATHS = [
  'files.visible',
  'folders.visible',
  'links.visible',
]

const StyleControls = () => {
  const classes = useStyles()
  const visStyles = useVisStyles()
  const dispatch = useDispatch()

  const values = useMemo(() => {
    return getPaths(visStyles, PATHS)
  }, [visStyles])

  const updaters = useMemo(() => {
    return createUpdaters(PATHS, updateVisStyles, dispatch)
  }, [dispatch])

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <Row
        label="files"
        disabled={!values['files.visible']}
        initialOpen
        headerRight={
          <Checkbox
            checked={values['files.visible']}
            onChange={updaters['files.visible']}
          />
        }
      >
        <FileControls />
      </Row>
      <Row
        label="folders"
        disabled={!values['folders.visible']}
        initialOpen
        headerRight={
          <Checkbox
            checked={values['folders.visible']}
            onChange={updaters['folders.visible']}
          />
        }
      >
        <FolderControls />
      </Row>
      <Row
        label="links"
        disabled={!values['links.visible']}
        initialOpen
        headerRight={
          <Checkbox
            checked={values['links.visible']}
            onChange={updaters['links.visible']}
          />
        }
      >
        <LinkControls />
      </Row>
    </div>
  )
}

export default StyleControls
