import React, { useState, useCallback, useMemo } from 'react'
import { useLocation } from 'store/selectors'
import LinkIcon from '@material-ui/icons/Link'
import ToggleButton from '../core/ToggleButton'
import queryString from 'query-string'

const ORIGIN = window.location.origin

const LinkButton = () => {
  const [tooltip, setTooltip] = useState('copy link to this vis')
  const location = useLocation()

  const shareLink = useMemo(() => {
    const { pathname, search } = location
    const params = queryString.parse(search)
    delete params.context
    const query = queryString.stringify(params)
    return `${ORIGIN}${pathname}?${query}`
  }, [location])

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
