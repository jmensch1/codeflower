const Sentry = require('@sentry/node')
const config = require('@config')

Sentry.init({ dsn: config.sentry.dsn })

module.exports = Sentry
