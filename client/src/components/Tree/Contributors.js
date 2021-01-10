import React, { useState, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import { useRepo, useQuery } from 'store/selectors'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 10,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: 4,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: '50%',
    marginRight: 8,
  },
  contributorLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}))

const Contributors = () => {
  const classes = useStyles()
  const [contributors, setContributors] = useState([])
  const { username, password } = useQuery()
  const repo = useRepo()
  const auth = useRef(null)

  useEffect(() => {
    auth.current = username && password ? { username, password } : null
  }, [username, password])

  useEffect(() => {
    if (!repo) return

    const { owner, name } = repo
    const url = `https://api.github.com/repos/${owner}/${name}/contributors`
    axios.get(url, { auth: auth.current })
      .then(({ data }) => {
        const conts = data.filter((el) => el.type === 'User') // exclude bots
        setContributors(conts)
      })
  }, [repo])

  return (
    <div className={classes.root}>
      {contributors.map((contributor) => (
        <div key={contributor.id} className={classes.listItem}>
          <img
            className={classes.avatar}
            src={contributor.avatar_url}
            alt={contributor.login}
          />
          <a
            className={classes.contributorLink}
            href={contributor.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <Typography>{contributor.login}</Typography>
          </a>
        </div>
      ))}
    </div>
  )
}

export default Contributors
