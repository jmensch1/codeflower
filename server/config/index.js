require('dotenv').config()
const path = require('path')

//////// ENVIRONMENT-DEPENDENT CONSTANTS ///////////

function checkEnv(keys) {
  console.log('\n------------ ENVIRONMENT ------------\n')

  const env = {}
  keys.forEach(key => {
    env[key] = process.env[key]
    if (!env[key])
      console.warn('Environment is missing:', key)
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
  'GITHUB_TEST_USERNAME',
  'GITHUB_TEST_PASSWORD',
  'SENDGRID_EMAIL',
  'SENDGRID_API_KEY',
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
    repos: path.join(__dirname, '../tmp/repos/'),
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
    }
  },

  cloc: {
    dataFile: 'data.cloc',
    ignoredFile: 'ignored.txt',
  },

  github: {
    creds: {
      username: env.GITHUB_TEST_USERNAME,
      password: env.GITHUB_TEST_PASSWORD,
    }
  },

  sendgrid: {
    email: env.SENDGRID_EMAIL,
    apiKey: env.SENDGRID_API_KEY,
  },

  logLevel: 1,

  emailUnhandledErrors: false,

  deleteAfterClone: false,

}
