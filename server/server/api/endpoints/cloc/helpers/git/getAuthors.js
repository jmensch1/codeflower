const { exec, concat } = require('@util/shell')
const { writeJson } = require('@util/files')
const config = require('@config')

async function getFilesForAuthor(cwd, email) {
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

function groupAuthorsByEmail(authors) {
  const groupedAuthors = []

  authors.forEach((author) => {
    const dupeAuthor = groupedAuthors.find((a) => a.email === author.email)
    if (dupeAuthor) dupeAuthor.commits += author.commits
    else groupedAuthors.push(author)
  })

  groupedAuthors.forEach((author, index) => {
    author.id = index
  })

  return groupedAuthors
}

async function getAuthorsData(repoId, onUpdate) {
  const cwd = config.paths.repo(repoId, 'root')
  const cmd = `git log --pretty=short --no-merges | git shortlog -nse | cat`

  onUpdate(`\n>> ${cmd}`)

  const { stdout } = await exec(cmd, { cwd, onUpdate })

  let authors = stdout
    .split('\n')
    .slice(0, -1)
    .map((line, idx) => {
      const [commits, author] = line.split('\t')
      const [_, name, email] = author.match(/^(.*?)\s<(.*?)>$/)
      return {
        id: idx,
        commits: +commits.trim(),
        name,
        email,
      }
    })

  onUpdate('\nGrouping authors by email')

  authors = groupAuthorsByEmail(authors)

  /*
    NOTE: this can easily crash the server if the number of commits and/or
    authors is large.
  */
  const authorFiles = await Promise.all(
    authors.map((author) => {
      return getFilesForAuthor(cwd, author.email)
    })
  )

  authors.forEach((author, idx) => {
    author.files = authorFiles[idx]
    author.numFilesTouched = authorFiles[idx].length
  })

  return authors
}

async function getAuthors(repoId, onUpdate) {
  const authors = await getAuthorsData(repoId, onUpdate)
  const file = config.paths.repo(repoId, 'authors.json')
  writeJson(file, authors)
  return authors
}

module.exports = getAuthors
