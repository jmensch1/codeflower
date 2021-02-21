import React, { useMemo } from 'react'
// import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useLanguageCounts, useLanguageColors } from 'store/selectors'
// import { selectLanguage } from 'store/actions/settings'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '0 0.5em',
  },
  label: {
    fontSize: '0.8em',
    fontStyle: 'italic',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1em',
  },
  bar: {
    height: 10,
    borderRadius: 2,

  },
}))

const Barplot = () => {
  const classes = useStyles()
  const counts = useLanguageCounts()
  const colors = useLanguageColors()
  // const dispatch = useDispatch()

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

  // const onSelectLanguage = (language) => {
  //   dispatch(selectLanguage(language))
  // }

  return (
    <div className={classes.root}>
      {counts.map((count, idx) => (
        <div key={count.language}>
          <div className={classes.label}>
            <span>{ count.language }</span>
            <span>{ count.lines }</span>
          </div>
          <div
            className={classes.bar}
            style={{
              backgroundColor: colors[count.language],
              width: `${100 * count.lines / totals.lines}%`,
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default Barplot
