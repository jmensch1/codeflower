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
        {counts.map((count) => {
          const backgroundColor = colors[count.language]
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
                    border:
                      backgroundColor === 'transparent'
                        ? '1px white solid'
                        : undefined,
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
  )
}

export default LanguagesTable
