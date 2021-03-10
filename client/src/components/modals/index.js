import React from 'react'
import ThemeProvider from 'components/theme/ThemeProvider'
import Search from './Search'
import MaxNodes from './MaxNodes'
import Credentials from './Credentials'
import About from './About'

const Modals = () => {
  return (
    <ThemeProvider type='modals'>
      <Search />
      <MaxNodes />
      <Credentials />
      <About />
    </ThemeProvider>
  )
}

export default Modals
