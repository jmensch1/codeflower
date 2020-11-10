const getUsers = require('../../users')
const fs = require('fs')
const config = require('@config')

function getUsersJson(ctrl) {
  const { repoId } = ctrl.repo
  return getUsers({ params: { repoId }})
    .then(users => {
      ctrl.repo.users = users

      const file = `${config.paths.repo(repoId)}/users.json`
      return fs.promises.writeFile(file, JSON.stringify(users))
    })
    .then(() => ctrl)
}

module.exports = getUsersJson
