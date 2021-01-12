//////////// IMPORTS ////////////

const { exec, concat } = require('@util/shell')
const config = require('@config')
const Log = require('@log')

//////////// PRIVATE ////////////

function getFilesForUser(cwd, email) {
  const cmd = concat([
    'git log',
    '--no-merges',
    `--author="${email}"`,
    '--name-only',
    '--use-mailmap',
    '--pretty=format:""',
    '| sort -u',
  ])

  return exec(cmd, { cwd }).then(({ stdout }) =>
    stdout.split('\n').slice(1, -1)
  )
}

function getUsers({ repoId }) {
  const cwd = `${config.paths.repo(repoId)}/repo`
  const cmd = `git log --use-mailmap --pretty=short | git shortlog -nse | cat`

  return exec(cmd, { cwd })
    .then(({ stdout }) => {
      const users = stdout
        .split('\n')
        .slice(0, -1)
        .map((line, idx) => {
          const [count, user] = line.split('\t')
          const [_, name, email] = user.match(/^(.*?)\s<(.*?)>$/)
          return {
            id: idx,
            count: +count.trim(),
            name,
            email,
          }
        })

      return Promise.all(users.map(user => getFilesForUser(cwd, user.email)))
        .then(userFiles => {
          users.forEach((user, idx) => {
            user.files = userFiles[idx]
            user.numFilesTouched = userFiles[idx].length
          })
          return users
        })
    })
}

module.exports = getUsers
