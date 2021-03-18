import React from 'react'
import { useRepo, useContext } from 'store/selectors'
import Bar from './core/Bar'
import Divider from './core/Divider'

import SearchButton from './buttons/SearchButton'
// import VisTypeButtons from './buttons/VisTypeButtons'
import VisThemeButtons from './buttons/VisThemeButtons'
// import ControlsButton from './buttons/ControlsButton'
import FullscreenButton from './buttons/FullscreenButton'
import AboutButton from './buttons/AboutButton'
// import LinkButton from './buttons/LinkButton'
import GalleryButton from './buttons/GalleryButton'

const ControlBar = () => {
  const repo = useRepo()
  const { isWeb } = useContext()

  if (!repo) return null

  return (
    <Bar>
      {isWeb && (
        <>
          <SearchButton />
          <Divider />
        </>
      )}
      {/*<VisTypeButtons />
      <Divider />*/}
      <VisThemeButtons />
      <Divider />
      {/*<ControlsButton />*/}
      <GalleryButton />
      <FullscreenButton />
      <AboutButton />
      {/*<Divider />
      <LinkButton />*/}
    </Bar>
  )
}

export default ControlBar
