import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import LanguageIcon from '@material-ui/icons/Language'
import FolderIcon from '@material-ui/icons/FolderOpen'
import PeopleIcon from '@material-ui/icons/People'
import TuneIcon from '@material-ui/icons/Tune'
import PaletteIcon from '@material-ui/icons/Palette'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
      backgroundColor: theme.palette.grey[800],
    },
  },
  active: {
    backgroundColor: theme.palette.grey[900],
    cursor: 'default',
  },
}))

const TABS = [
  {
    type: 'languages',
    Icon: LanguageIcon,
  },
  {
    type: 'folders',
    Icon: FolderIcon,
  },
  {
    type: 'authors',
    Icon: PeopleIcon
  },
  {
    type: 'controls',
    Icon: TuneIcon,
  },
  {
    type: 'palette',
    Icon: PaletteIcon,
  }
]

const Tabs = ({ activeTab, onChange }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {TABS.map(({ type, Icon }) => (
        <div
          key={type}
          className={clsx(classes.tab, { [classes.active]: activeTab === type })}
          onClick={() => onChange(type)}
        >
          <Icon />
        </div>
      ))}
    </div>
  )
}

export default Tabs
