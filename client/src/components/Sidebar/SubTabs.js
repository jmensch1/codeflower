import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    userSelect: 'none',
  },
  tab: {
    padding: 5,
    borderBottom: `1px ${theme.palette.divider} solid`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flex: 1,
    color: theme.palette.text.disabled,
    '&:hover:not($active)': {
      color: theme.palette.text.primary,
    },
  },
  active: {
    borderBottom: `1px ${theme.palette.text.primary} solid`,
    color: theme.palette.text.primary,
    cursor: 'default',
  },
}))

const SubTabs = ({ tabs, activeTab, onChange }) => {
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
          {type}
        </div>
      ))}
    </div>
  )
}

export default SubTabs
