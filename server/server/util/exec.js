const { exec } = require('child_process')

function execCmd(cmd, options={}) {
  const { onUpdate, ...opts } = options

  return new Promise((resolve, reject) => {
    const proc = exec(cmd, opts, (err, stdout, stderr) => {
      if (err)
        reject({ err, stdout, stderr })
      else
        resolve({ stdout, stderr })
    })

    if (typeof onUpdate === 'function') {
      proc.stdout.on('data', onUpdate)
      proc.stderr.on('data', onUpdate)
    }
  })
}

module.exports = execCmd
