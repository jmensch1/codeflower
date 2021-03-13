import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  tab: {
    padding: 5,
    borderTop: `1px ${theme.palette.divider} solid`,
    borderBottom: `1px ${theme.palette.divider} solid`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flex: 1,
    '&:hover:not($active)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  active: {
    backgroundColor: theme.palette.action.selected,
    cursor: 'default',
  },
}))

const Tabs = ({ tabs, activeTab, onChange }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {tabs.map(({ type, Icon, Comppone }) => (
        <div
          key={type}
          className={clsx(classes.tab, {
            [classes.active]: activeTab === type,
          })}
          onClick={() => onChange(type)}
        >
          <Icon />
        </div>
      ))}
    </div>
  )
}

export default Tabs
