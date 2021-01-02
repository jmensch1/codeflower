const Mixpanel = require('mixpanel')
const config = require('@config')

const mixpanel = Mixpanel.init(config.mixpanel.token || 'NOOP_TOKEN')

module.exports = mixpanel
