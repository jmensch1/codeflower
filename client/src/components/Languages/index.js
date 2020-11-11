import React from 'react'
import { useDispatch } from 'react-redux'
import { createUseStyles } from 'react-jss'
import { useLanguages } from 'store/selectors'
import { selectLanguage } from 'store/languages'

const useStyles = createUseStyles({
  root: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    border: '1px black solid',
    borderRadius: 10,
    padding: 10,
    userSelect: 'none',
  },
  table: {
    borderCollapse: 'collapse',
    '& th, & td': {
      textAlign: 'left',
      padding: [5, 10],
    },
    '& td:last-child': {
      textAlign: 'center',
      '& > div': {
        display: 'inline-block',
        height: 16,
        width: 16,
        borderRadius: 8,
      }
    },
    '& tbody tr': {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'red'
      },
    },
  }
})

const Languages = () => {
  const classes = useStyles()
  const languages = useLanguages()
  const dispatch = useDispatch()

  const onSelectLanguage = (langClass) => {
    dispatch(selectLanguage(langClass))
  }

  if (!languages) return null
  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th>language</th>
            <th>files</th>
            <th>lines</th>
            <th>color</th>
          </tr>
        </thead>
        <tbody onMouseLeave={() => onSelectLanguage(undefined)}>
          {languages.map(lang => (
            <tr
              key={lang.language}
              onMouseEnter={() => onSelectLanguage(lang.class)}
            >
              <td>{ lang.language }</td>
              <td>{ lang.files }</td>
              <td>{ lang.lines }</td>
              <td><div className={lang.class} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Languages
