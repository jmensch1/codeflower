import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useLocation } from 'store/selectors'
import { useDispatch } from 'react-redux'
import { getRepo } from 'store/actions/repo'
import { openModal } from 'store/actions/modals'
import Sidebar from './Sidebar'
import Main from './Main'
import Modals from './modals'

const useStyles = makeStyles((theme) => ({
  '@global': {
    a: {
      textDecoration: 'underline',
      color: 'inherit',
    },
  },
  app: {
    height: '100vh',
    display: 'flex',
  },
  main: {
    flex: 1,
    height: '100%',
  },
}))

const App = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    query: { owner, name, branch },
  } = useLocation()

  useEffect(() => {
    if (owner && name) dispatch(getRepo({ owner, name, branch }))
    else dispatch(openModal('search'))
  }, [dispatch, owner, name, branch])

  return (
    <>
      <div className={classes.app}>
        <Sidebar />
        <div className={classes.main}>
          <Main />
        </div>
      </div>
      <Modals />
    </>
  )
}

export default App
