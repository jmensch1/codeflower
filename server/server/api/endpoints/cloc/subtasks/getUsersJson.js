const { exec, concat } = require('@util/shell')
const { writeJson } = require('@util/files')
const config = require('@config')

async function getFilesForUser(cwd, email) {
  const cmd = concat([
    'git log',
    '--no-merges',
    `--author="${email}"`,
    '--name-only',
    '--pretty=format:""',
    '| sort -u',
  ])

  const { stdout } = await exec(cmd, { cwd, maxBuffer: 1024 * 1000 })
  return stdout.split('\n').slice(1, -1)
}

function dedupeUsersByEmail(users) {
  const dedupedUsers = []

  users.forEach((user) => {
    const dupeUser = dedupedUsers.find(u => u.email === user.email)
    if (dupeUser)
      dupeUser.commits += user.commits
    else
      dedupedUsers.push(user)
  })

  dedupedUsers.forEach((user, index) => {
    user.id = index
  })

  return dedupedUsers
}

async function getUsers(repoId) {
  const cwd = config.paths.repo(repoId, 'root')
  const cmd = `git log --pretty=short --no-merges | git shortlog -nse | cat`

  const { stdout } = await exec(cmd, { cwd })

  let users = stdout
    .split('\n')
    .slice(0, -1)
    .map((line, idx) => {
      const [commits, user] = line.split('\t')
      const [_, name, email] = user.match(/^(.*?)\s<(.*?)>$/)
      return {
        id: idx,
        commits: +commits.trim(),
        name,
        email,
      }
    })

  users = dedupeUsersByEmail(users)

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
  const file = config.paths.repo(repoId, 'users.json')
  writeJson(file, users)
  return users
}

module.exports = getUsersJson
