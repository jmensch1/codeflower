import React, { useState, useCallback } from 'react'
import LinkIcon from '@material-ui/icons/Link'
import ToggleButton from './ToggleButton'

const LinkButton = () => {
  const [tooltip, setTooltip] = useState('copy link to this vis')

  const copyLink = useCallback(() => {
    try {
      const { href } = window.location
      navigator.clipboard.writeText(href)
      setTooltip('link copied')
    } catch (e) {
      setTooltip('could not copy link')
    }
  }, [])

  const reset = useCallback(() => {
    setTimeout(() => {
      setTooltip('copy link to this vis')
    }, 300)
  }, [])

  return (
    <div onMouseLeave={reset}>
      <ToggleButton
        value={false}
        onChange={copyLink}
        buttons={[
          {
            value: false,
            Icon: LinkIcon,
            text: tooltip,
          },
        ]}
      />
    </div>
  )
}

export default LinkButton
