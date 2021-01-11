//////////// IMPORTS ////////////

const config = require('@config'),
      Log = require('@log'),
      Sentry = require('@util/sentry')

//////////// PRIVATE ////////////

function handleErrors(error, onError) {
  Log(2, 'Handling Errors')

  // is the error listed in the config?
  let isClientError =
    Object.values(config.errors)
      .map((e) => e.name)
      .indexOf(error.name) !== -1

  if (isClientError) {
    let errData =
      (error.repo && error.repo.fNameBr) ||
      (typeof error.endpoint !== 'undefined' && '/' + error.endpoint)
    Log(1, 'ERROR:', error.name, errData || '')
    onError(error)
  } else {
    // replace username and password, if any, in stack trace
    if (error.stack)
      error.stack = error.stack.replace(
        /https:\/\/.*?@/g,
        'https://******:******@'
      )

    // Log('error', error)

    onError({
      name: 'ServerError',
      statusCode: 500,
      stack: error.stack,
      params: error.params,
      repo: error.repo,
    })

    Sentry.captureException(error)
  }
}

//////////// EXPORTS ////////////

module.exports = handleErrors
