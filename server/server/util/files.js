const fs = require('fs')

function writeJson(path, data) {
  return fs.promises.writeFile(path, JSON.stringify(data, null, 2))
}

function readJson(path) {
  return fs.promises.readFile(path, 'utf-8')
    /*
      NOTE: this replacement fixes an invalid JSON error that arises when
      cloc output includes a filename that contains an escape character.
      e.g. https://github.com/systemd/systemd/blob/main/test/fuzz/fuzz-unit-file/dev-mapper-fedora_krowka%5Cx2dswap.swap

      I made an issue in the cloc repo about this:
      https://github.com/AlDanial/cloc/issues/575
    */
    .then(str => str.replace(/\\/g, '\\\\'))
    .then(JSON.parse)
}

module.exports = {
  writeJson,
  readJson,
}
