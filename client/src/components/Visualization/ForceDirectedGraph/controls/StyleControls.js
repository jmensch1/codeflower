import React, { useCallback, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useVisStyles } from 'store/selectors'
import { setVisStyles } from 'store/actions/settings'
import { useDispatch } from 'react-redux'
import Checkbox from 'components/core/Checkbox'
import FileControls from './FileControls'
import FolderControls from './FolderControls'
import LinkControls from './LinkControls'

const useRowStyles = makeStyles((theme) => ({
  root: {
    userSelect: 'none',
    cursor: 'pointer',
  },
  header: {
    display: 'flex',
  },
  arrowContainer: {
    width: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  arrow: {
    transform: ({ open }) => open ? 'rotate(90deg)' : 'rotate(0deg)',
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {},
  content: {
    paddingTop: '1em',
    paddingLeft: '1em',
  },
}))

const Row = ({ label, button, children }) => {
  const [open, setOpen] = useState(false)
  const classes = useRowStyles({ open })

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.arrowContainer}>
          <div className={classes.arrow}>></div>
        </div>
        <div
          className={classes.label}
          onClick={() => setOpen(!open)}
        >
          { label }
        </div>
        <div className={classes.button}>
          { button }
        </div>
      </div>
      {open && (
        <div className={classes.content}>
          { children }
        </div>
      )}
    </div>
  )
}

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
