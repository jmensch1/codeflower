//////////// IMPORTS ////////////

const config = require('@config')
const Log = require('@log')
const Sentry = require('@util/sentry')

//////////// PRIVATE ////////////

function handleErrors(error, onError, onUpdate) {
  Log(2, 'Handling Errors')

  // is the error listed in the config?
  let isClientError =
    Object.values(config.errors)
      .map((e) => e.name)
      .indexOf(error.name) !== -1

  if (isClientError) {
    Log(1, 'ERROR:', error.name)
    return onError(error)
  }

  Log('SERVER ERROR', error)

  if (error.stack) {
    // replace access token, if any, in stack trace
    error.stack = error.stack.replace(
      /https:\/\/.*?@/g,
      'https://******@'
    )
    onUpdate(error.stack)
  }

  if (error.params) {
    delete error.params.username
    delete error.params.password
  }

  onError({
    name: error.name || 'ServerError',
    statusCode: 500,
    stack: error.stack,
    params: error.params,
    ...error,
  })

  Sentry.captureException(error)
}

//////////// EXPORTS ////////////

module.exports = handleErrors
