import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/actions/modals'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import {
  WEB_URL,
  GITHUB_URL,
  CHROME_URL,
  FIREFOX_URL,
  CONTRIBUTORS_URL,
  BUG_REPORT_URL,
  FEATURE_REQUEST_URL,
} from 'constants.js'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      padding: '20px 30px',
    },
    '& h1': {
      marginBottom: 6,
      '&:not(:first-of-type)': {
        marginTop: 15,
      },
    },
  },
}))

const Heading = ({ children }) => (
  <Typography variant="h6" component="h1" align="center">
    {children}
  </Typography>
)

const Link = ({ href, children }) => (
  <a href={href} target="_blank" rel="noreferrer">
    {children}
  </a>
)

const Graph = ({ children }) => (
  <Typography paragraph component="div">
    {children}
  </Typography>
)

const About = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpen } = useModal('about')

  const close = () => {
    dispatch(closeModal('about'))
  }

  const cleanWebUrl = WEB_URL.replace(/^https?:\/\//, '')

  return (
    <Dialog className={classes.root} open={isOpen} onClose={close}>
      <Heading>The Vis</Heading>
      <Graph>
        It's a git repo, visualized as a{' '}
        <Link href="https://github.com/d3/d3-force">force-directed graph</Link>.
      </Graph>
      <Graph>
        The inner nodes represent the directories in the repo, and the outer
        ones represent the files. The radius of each outer node is proportional
        to the number of lines of code in the corresponding file.
      </Graph>
      <Graph>
        Hover on the nodes to see the names of the directories/files. Click on
        the outer nodes to bring up the full text of the corresponding file. You
        can also pan the vis by clicking-and-dragging, and zoom it with the
        mouse wheel.
      </Graph>

      <Heading>The Tech</Heading>
      <Graph>
        We've got React/Redux on the frontend, and a Node server&mdash;with
        websockets&mdash;on the back. Line counts come from{' '}
        <Link href="https://github.com/AlDanial/cloc">cloc</Link>.
      </Graph>
      <Graph>
        The app is available on the web at{' '}
        <Link href={WEB_URL}>{cleanWebUrl}</Link> and as a browser extension for{' '}
        <Link href={CHROME_URL}>chrome</Link> and{' '}
        <Link href={FIREFOX_URL}>firefox</Link>. The extension embeds the app
        directly in Github.
      </Graph>
      <Graph>
        The code is <Link href={GITHUB_URL}>here</Link>.{' '}
        <Link href={CONTRIBUTORS_URL}>Contributions</Link>,{' '}
        <Link href={BUG_REPORT_URL}>bug reports</Link>, and{' '}
        <Link href={FEATURE_REQUEST_URL}>feature requests</Link> are most
        welcome. 🙏
      </Graph>

      <Heading>Credits</Heading>
      <Graph>
        Tons of credit to{' '}
        <Link href="https://twitter.com/francoisz">
          Fran&#231;ois Zaninotto
        </Link>
        , who figured out that cloc output could be used to generate a
        force-directed graph, and wrote the original{' '}
        <Link href="https://github.com/fzaninotto/CodeFlower">CodeFlower</Link>{' '}
        vizualization.
      </Graph>
    </Dialog>
  )
}

export default About
