const { exec, concat } = require('@util/shell')
const { writeJson } = require('@util/files')
const config = require('@config')

async function getFilesForUser(cwd, email) {
  const cmd = concat([
    'git log',
    '--no-merges',
    `--author="${email}"`,
    '--name-only',
    '--use-mailmap',
    '--pretty=format:""',
    '| sort -u',
  ])

  const { stdout } = await exec(cmd, { cwd })
  return stdout.split('\n').slice(1, -1)
}

async function getUsers(repoId) {
  const cwd = `${config.paths.repo(repoId)}/repo`
  const cmd = `git log --use-mailmap --pretty=short | git shortlog -nse | cat`

  const { stdout } = await exec(cmd, { cwd })

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

  const userFiles = await Promise.all(users.map(user => {
    return getFilesForUser(cwd, user.email)
  }))

  users.forEach((user, idx) => {
    user.files = userFiles[idx]
    user.numFilesTouched = userFiles[idx].length
  })

  return users
}

async function getUsersJson(repoId) {
  const users = await getUsers(repoId)
  const file = `${config.paths.repo(repoId)}/users.json`
  await writeJson(file, users)
  return users
}

module.exports = getUsersJson
