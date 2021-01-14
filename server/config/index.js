const fs = require('fs')
const { join } = require('path')

// use .env.local for env vars if it exists, otherwise .env
require('dotenv').config({
  path: (() => {
    const envPath = join(__dirname, '../.env')
    const envLocalPath = join(__dirname, '../.env.local')
    return fs.existsSync(envLocalPath) ? envLocalPath : envPath
  })()
})

//////// ENVIRONMENT-DEPENDENT CONSTANTS ///////////

function checkEnv(keys) {
  console.log('\n------------ ENVIRONMENT ------------\n')

  const env = {}
  keys.forEach(key => {
    env[key] = process.env[key]
    if (!env[key])
      console.log('Environment is missing:', key)
    else
      console.log('Found key:', key)
  })

  console.log('\n-------------------------------------\n')
  return env
}

const env = checkEnv([
  'HOST',
  'HTTP_PROTOCOL',
  'WS_PROTOCOL',
  'HTTP_PORT',
  'WS_PORT',
  'MIXPANEL_TOKEN',
  'SENTRY_DSN',
  'GITHUB_TEST_USERNAME',
  'GITHUB_TEST_PASSWORD',
])

///////////////////// EXPORT ///////////////////////

module.exports = {

  host: env.HOST,

  protocols: {
    HTTP: env.HTTP_PROTOCOL,
    WS: env.WS_PROTOCOL,
  },

  ports: {
    HTTP: env.HTTP_PORT,
    WS:   env.WS_PORT,
  },

  paths: {
    repos: join(__dirname, '../tmp/repos/'),
    repo: (repoId, ...paths) => join(__dirname, '../tmp/repos', repoId, ...paths),
  },

  endpoints: {
    cloc: 'cloc',
    ping: 'ping',
    file: 'file',
  },

  responseTypes: {
    update:  'update',
    error:   'error',
    success: 'success',
  },

  errors: {
    ParseError: {
      name: 'ParseError',
      message: 'Your request could not be parsed. Please check the format of the request.',
      statusCode: 400,
    },
    EndpointNotRecognized: {
      name: 'EndpointNotRecognized',
      message: 'Please check your endpoint.',
      statusCode: 404,
    },
    MethodNotAllowed: {
      name: 'MethodNotAllowed',
      message: 'The HTTP server accepts only GET and POST requests.',
      statusCode: 405,
    },

    // cloc endpoint
    NeedOwnerAndName: {
      name: 'NeedOwnerAndName',
      message: 'The owner and name of a repo are required parameters.',
      statusCode: 400,
    },
    NeedCredentials: {
      name: 'NeedCredentials',
      message: 'A github username and password are required to access this repo.',
      statusCode: 401,
    },
    CredentialsInvalid: {
      name: 'CredentialsInvalid',
      message: 'The given github username/password combination is invalid.',
      statusCode: 401,
    },
    RepoNotFound: {
      name: 'RepoNotFound',
      message: 'The given repo could not be found.',
      statusCode: 404,
    },
    BranchNotFound: {
      name: 'BranchNotFound',
      message: 'The given branch could not be found',
      statusCode: 404,
    },

    // file endpoint
    BadFileRequest: {
      name: 'BadFileRequest',
      message: 'repoId and path are required params',
      statusCode: 400,
    },
    FileNotFound: {
      name: 'FileNotFound',
      message: 'The given file could not be found',
      statusCode: 404,
    },
  },

  cloc: {
    dataFile: 'cloc.json',
    ignoredFile: 'ignored.json',
  },

  mixpanel: {
    token: env.MIXPANEL_TOKEN,
  },

  sentry: {
    dsn: env.SENTRY_DSN,
  },

  github: {
    creds: {
      username: env.GITHUB_TEST_USERNAME,
      password: env.GITHUB_TEST_PASSWORD,
    }
  },

  logLevel: 2,

  deleteAfterClone: false,

}
