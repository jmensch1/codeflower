import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { closeModal } from 'store/actions/modals'
import { useModal } from 'store/selectors'
import { makeStyles } from '@material-ui/core/styles'
import Modal from 'components/core/Modal'
import Header from './Header'
import Main from './Main'
import Sidebar from './Sidebar'

const useStyles = makeStyles((theme) => ({
  root: {},
  modalBackground: {
    opacity: 0.6,
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 1200,
  },
  content: {
    height: '100%',
    display: 'flex',
  },
  sidebar: {
    width: 300,
    height: '100%',
    borderRight: `1px ${theme.palette.divider} solid`,
  },
  main: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
}))

const INITIAL_SETTINGS = {
  transparent: false,
  format: 'png',
}

const Export = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen } = useModal('export')
  const [settings, setSettings] = useState(INITIAL_SETTINGS)

  const close = useCallback(() => {
    dispatch(closeModal('export'))
  }, [dispatch])

  return (
    <Modal
      open={isOpen}
      onClose={close}
      classes={{
        background: classes.modalBackground,
        content: classes.modalContent,
      }}
    >
      <Header onClose={close} />
      <div className={classes.content}>
        <div className={classes.sidebar}>
          <Sidebar
            settings={settings}
            onChangeSettings={setSettings}
          />
        </div>
        <div className={classes.main}>
          <Main
            settings={settings}
            onChangeSettings={setSettings}
          />
        </div>
      </div>
    </Modal>
  )
}

export default Export
