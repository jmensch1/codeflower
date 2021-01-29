import React, { useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useVisStyles } from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import Checkbox from 'components/core/Checkbox'
import FileControls from './FileControls'
import FolderControls from './FolderControls'
import LinkControls from './LinkControls'
import Row from './Row'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    '& > *': {
      marginBottom: 10,
    }
  },
}))

const StyleControls = () => {
  const classes = useStyles()
  const visStyles = useVisStyles()
  const dispatch = useDispatch()

  const onChangeStyles = useCallback((visStyles) => {
    dispatch(setVisStyles({
      ...visStyles,
      id: undefined,
    }))
  }, [dispatch])

  if (!visStyles) return null
  return (
    <div className={classes.root}>
      <Row
        label='files'
        button={
          <Checkbox
            obj={visStyles}
            path='files.visible'
            onChange={onChangeStyles}
          />
        }
      >
        <FileControls />
      </Row>
      <Row
        label='folders'
        button={
          <Checkbox
            obj={visStyles}
            path='folders.visible'
            onChange={onChangeStyles}
          />
        }
      >
        <FolderControls />
      </Row>
      <Row
        label='links'
        button={
          <Checkbox
            obj={visStyles}
            path='links.visible'
            onChange={onChangeStyles}
          />
        }
      >
        <LinkControls />
      </Row>
    </div>
  )
}

export default StyleControls
