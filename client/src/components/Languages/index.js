import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useLanguages, useRepo, useLanguageColors } from 'store/selectors'
import { selectLanguage } from 'store/actions/settings'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FolderSelect from './FolderSelect'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 360,
    maxHeight: 'calc(100% - 20px)',
    zIndex: 1,
    padding: 0,
    userSelect: 'none',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    display: 'flex',
    ...theme.languages,
  },
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    opacity: 0.95,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
  },
  scroller: {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(1),
  },
  break: {
    wordBreak: 'break-word',
  },
  noBreak: {
    whiteSpace: 'nowrap',
  },
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    marginTop: 15,
    '& th, & td': {
      textAlign: 'left',
      padding: '5px 10px',
      '&:last-child': {
        textAlign: 'center',
      },
    },
    '& td:last-child': {
      textAlign: 'center',
      '& > div': {
        height: 16,
        width: 16,
        borderRadius: 8,
        margin: '0 auto',
      },
    },
    '& tbody tr': {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.grey[700],
      },
    },
    '& tfoot tr': {
      fontWeight: 'bold',
    },
  },
}))

const Languages = () => {
  const classes = useStyles()
  const { counts } = useLanguages()
  const languageColors = useLanguageColors()
  const repo = useRepo()
  const dispatch = useDispatch()

  const totals = useMemo(() => {
    if (!counts) return null
    
    return counts.reduce(
      (totals, count) => {
        totals.files += count.files
        totals.lines += count.lines
        return totals
      },
      { files: 0, lines: 0 }
    )
  }, [counts])

  const onSelectLanguage = (language) => {
    dispatch(selectLanguage(language))
  }

  if (!repo || !counts) return null
  return (
    <Paper className={classes.paper}>
      <div className={classes.background} />
      <div className={classes.scroller}>
        <Typography variant="h6" align="center" className={classes.break}>
          <span className={classes.noBreak}>{repo.owner}</span>/
          <span className={classes.noBreak}>{repo.name}</span>
        </Typography>
        <Typography align="center">({repo.branch})</Typography>
        <FolderSelect />
        <table className={classes.table}>
          <thead>
            <tr>
              <th>language</th>
              <th>files</th>
              <th>lines</th>
              <th>color</th>
            </tr>
          </thead>
          <tbody onMouseLeave={() => onSelectLanguage(null)}>
            {counts.map((count) => {
              const backgroundColor = languageColors[count.language]
              return (
                <tr
                  key={count.language}
                  onMouseEnter={() => onSelectLanguage(count.language)}
                >
                  <td>{count.language}</td>
                  <td>{count.files}</td>
                  <td>{count.lines}</td>
                  <td>
                    <div
                      style={{
                        backgroundColor,
                        border: backgroundColor === 'transparent'
                          ? '1px white solid'
                          : undefined
                      }}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>totals</td>
              <td>{totals.files}</td>
              <td>{totals.lines}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Paper>
  )
}

export default Languages
