import React, { useRef, useEffect, useState, useCallback } from 'react'
import Select from 'components/core/Select'

// see https://github.com/highlightjs/highlight.js/tree/master/src/styles
// demo here: https://highlightjs.org/static/demo/
const HIGHLIGHT_STYLES = [
  'night-owl',
  'solarized-dark',
  'solarized-light',
  'github',
  'sunburst',
  'zenburn',
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
    stylesheet.href = stylesheetUrl(highlightStyle)
    document.head.appendChild(stylesheet)

    // remove old stylesheet
    stylesheet.addEventListener(
      'load',
      () => {
        if (stylesheetRef.current) {
          stylesheetRef.current.disabled = true
          document.head.removeChild(stylesheetRef.current)
        }

        stylesheetRef.current = stylesheet
      },
      { once: true }
    )
  }, [highlightStyle])

  const renderValue = useCallback((value) => {
    return value.replace(/[.-]/g, ' ')
  }, [])

  return (
    <Select
      options={HIGHLIGHT_STYLES}
      value={highlightStyle}
      onChange={setHighlightStyle}
      renderValue={renderValue}
    />
  )
}

export default HighlightSelect
