import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react'
import Select from 'components/core/Select'

const HIGHLIGHT_STYLES = [
  {
    value: 'solarized-dark',
    name: 'solarized dark',
  },
  {
    value: 'solarized-light',
    name: 'solarized light',
  },
  {
    value: 'github',
    name: 'github',
  },
  {
    value: 'night-owl',
    name: 'night owl',
  },
  {
    value: 'sunburst',
    name: 'sunburst',
  },
  {
    value: 'zenburn' ,
    name: 'zenburn',
  },
  // {
  //   value: '',
  //   name: '',
  // },
]

const stylesheetUrl = (highlightStyle) => `
  https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/${highlightStyle}.min.css
`

const HighlightSelect = () => {
  const [highlightStyle, setHighlightStyle] = useState(HIGHLIGHT_STYLES[0])
  const stylesheetRef = useRef(null)

  useEffect(() => {
    // add stylesheet to head
    const stylesheet = document.createElement('link')
    stylesheet.type = 'text/css'
    stylesheet.rel = 'stylesheet'
    stylesheet.href = stylesheetUrl(highlightStyle.value)
    document.head.appendChild(stylesheet)

    // remove old stylesheet
    stylesheet.addEventListener('load', () => {
      if (stylesheetRef.current) {
        stylesheetRef.current.disabled = true
        document.head.removeChild(stylesheetRef.current)
      }

      stylesheetRef.current = stylesheet
    }, { once: true })
  }, [highlightStyle])

  const styleNames = useMemo(() => {
    return HIGHLIGHT_STYLES.map((style) => style.name)
  }, [])

  const handleChange = useCallback((name) => {
    setHighlightStyle(HIGHLIGHT_STYLES.find(style => style.name === name))
  }, [])

  return (
    <Select
      options={styleNames}
      value={highlightStyle.name}
      onChange={handleChange}
    />
  )
}

export default HighlightSelect
