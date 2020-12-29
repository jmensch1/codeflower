import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/modals'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
// import { Zoom } from 'components/Transitions'
import { WEB_URL, GITHUB_URL, CHROME_URL, FIREFOX_URL } from 'constants.js'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      padding: '20px 30px',
    },
    '& a': {
      textDecoration: 'underline',
      color: theme.palette.text.primary,
    }
  },
}))

const Link = ({ href, children }) => (
  <a href={href} target='_blank' rel='noreferrer'>{ children }</a>
)

const About = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen } = useModal('about')

  const close = () => {
    dispatch(closeModal('about'))
  }

  if (!isOpen) return null

  const cleanWebUrl = WEB_URL.replace(/^https?:\/\//, '')

  return (
    <Dialog
      className={classes.root}
      open={isOpen}
      onClose={close}
      // TransitionComponent={Zoom}
    >
      <Typography variant='h6' align='center'>
        About
      </Typography>
      <p>
        Available on the web
        at <Link href={WEB_URL}>{cleanWebUrl}</Link> and
        as a browser extension
        for <Link href={CHROME_URL}>chrome</Link> and <Link href={FIREFOX_URL}>firefox</Link>.
      </p>
      <p>The code is <Link href={GITHUB_URL}>here</Link>.</p>
    </Dialog>
  )
}

export default About
