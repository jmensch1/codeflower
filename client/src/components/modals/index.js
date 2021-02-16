import React from 'react'
import Search from './Search'
import MaxNodes from './MaxNodes'
import Credentials from './Credentials'
import About from './About'
import FileViewer from './FileViewer'

const Modals = ({ sidebarWidth }) => {
  return (
    <>
      <Search />
      <MaxNodes />
      <Credentials />
      <About />
      <FileViewer sidebarWidth={sidebarWidth} />
    </>
  )
}

export default Modals
