//////////// IMPORTS ////////////

const { exec } = require('child_process'),
      config = require('@config'),
      Log = require('@log');

//////////// PRIVATE ////////////

function getFilesForUser(cwd, email) {
  return new Promise((resolve, reject) => {
    const cmd = `git log --no-merges --author="${email}" --name-only --pretty=format:"" | sort -u`

    let proc = exec(cmd, { cwd }, (err, stdout, stderr) => {
      const files = stdout.split('\n').slice(1, -1)
      resolve(files)
    })
  })
}

function getUsers({ resp, params: { repoId, repoName }}) {
  const cwd = `${config.paths.repos}${repoId}/${repoName}`
  const cmd = `git log --pretty=short | git shortlog -nse | cat`

  let proc = exec(cmd, { cwd }, (err, stdout, stderr) => {
    const users = stdout.split('\n').slice(0, -1).map(line => {
      let [count, user] = line.split('\t')
      const [_, name, email] = user.match(/^(.*?)\s<(.*?)>$/)
      return {
        count: +count.trim(),
        name,
        email,
      }
    })

    Promise.all(users.map(user => {
      return getFilesForUser(cwd, user.email)
    }))
      .then(userFiles => {
        users.forEach((user, idx) => {
          user.files = userFiles[idx]
        })
        resp.success(users)
      })
  });
}

module.exports = getUsers
