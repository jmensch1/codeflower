import React from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from 'store/selectors'
import { closeModal } from 'store/modals'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
// import { Zoom } from 'components/core/Transitions'
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
    },
    '& h1': {
      marginBottom: -10,
      '&:not(:first-of-type)': {
        marginTop: 15,
      }
    },
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
      <Typography variant='h6' component='h1' align='center'>
        The Vis
      </Typography>
      <Typography component='div'>
        <p>
          It's a git repo, visualized as
          a <Link href="https://github.com/d3/d3-force">force-directed graph</Link>.
        </p>
        <p>
          The inner nodes represent the directories in the repo, and the outer
          ones represent the files. The radius of each outer node is proportional
          to the number of lines of code in the corresponding file.
        </p>
        <p>
          Hover on the nodes to see the names of the directories/files.
          Click on the outer nodes to bring up the full text of the corresponding
          file.
        </p>
      </Typography>

      <Typography variant='h6' component='h1' align='center'>
        The Tech
      </Typography>
      <Typography component='div'>
        <p>
          We've got React/Redux on the frontend, and a Node server&mdash;with
          websockets&mdash;on the back. Line counts come
          from <Link href="https://github.com/AlDanial/cloc">cloc</Link>.
        </p>
        <p>
          The app is available on the web
          at <Link href={WEB_URL}>{cleanWebUrl}</Link> and
          as a browser extension
          for <Link href={CHROME_URL}>chrome</Link> and <Link href={FIREFOX_URL}>firefox</Link>.
          The extension embeds the app directly in Github.
        </p>
        <p>
          The code is <Link href={GITHUB_URL}>here</Link>. Contributions,
          bug reports, and feature requests are most welcome. 🙏
        </p>
      </Typography>

      <Typography variant='h6' component='h1' align='center'>
        Credits
      </Typography>
      <Typography component='div'>
        <p>
          Tons of credit to <Link href="http://www.redotheweb.com/">Fran&#231;ois Zaninotto</Link>,
          who figured out that cloc output could be used to generate a
          force-directed graph, and wrote the
          original <Link href="https://github.com/fzaninotto/CodeFlower">CodeFlower</Link> vizualization.
        </p>
      </Typography>

    </Dialog>
  )
}

export default About
