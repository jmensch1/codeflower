import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useLanguageCounts, useLanguageColors } from 'store/selectors'
import { selectLanguage } from 'store/actions/settings'

const useStyles = makeStyles((theme) => ({
  table: {
    borderCollapse: 'collapse',
    width: '100%',
    '& th, & td': {
      textAlign: 'left',
      padding: '5px 10px',
      '&:last-child': {
        textAlign: 'center',
      },
    },
    '& td:last-child': {
      position: 'relative',
      '& > svg': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    },
    '& tbody tr': {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    '& tfoot tr': {
      fontWeight: 'bold',
    },
  },
}))

const LanguagesTable = () => {
  const classes = useStyles()
  const counts = useLanguageCounts()
  const colors = useLanguageColors()
  const dispatch = useDispatch()

  const totals = useMemo(() => {
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

  return (
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
        {counts.map((count) => (
          <tr
            key={count.language}
            onMouseEnter={() => onSelectLanguage(count.language)}
          >
            <td>{count.language}</td>
            <td>{count.files}</td>
            <td>{count.lines}</td>
            <td>
              <svg>
                <circle r={8} cx="50%" cy="50%" fill={colors[count.language]} />
              </svg>
            </td>
          </tr>
        ))}
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
  )
}

export default LanguagesTable
