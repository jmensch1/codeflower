import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import HighlightSelect from './HighlightSelect'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: `1px ${theme.palette.divider} solid`,
    padding: '0.5em 1em',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875em',
  },
  select: {
    width: 120,
    '& select': {
      borderBottom: 'none',
      padding: 0,
      fontSize: '1em',
      userSelect: 'none',
    }
  },
}))

const Footer = ({ file, isLoading }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {isLoading
        ? <CircularProgress size={14} color="inherit" />
        : (
          <div>
            {file && (
              <>
                <span>
                  { file.highlightLanguage }
                </span>
                <span>
                  {file.cloc.languageUnknown
                    ? ' / Language unknown'
                    :  ` / ${file.cloc.language} / ${file.cloc.size} lines`
                  }
                </span>
              </>
            )}
          </div>
        )
      }
      <div className={classes.select}>
        <HighlightSelect />
      </div>
    </div>
  )
}

export default Footer
