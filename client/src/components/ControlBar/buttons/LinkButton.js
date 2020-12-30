import React, { useState, useCallback } from 'react'
import { useShareLink } from 'store/selectors'
import LinkIcon from '@material-ui/icons/Link'
import ToggleButton from '../core/ToggleButton'

const LinkButton = () => {
  const [tooltip, setTooltip] = useState('copy link to this vis')
  const shareLink = useShareLink()

  const copyLink = useCallback(() => {
    try {
      navigator.clipboard.writeText(shareLink)
      setTooltip('link copied')
    } catch (e) {
      setTooltip('could not copy link')
    }
  }, [shareLink])

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
