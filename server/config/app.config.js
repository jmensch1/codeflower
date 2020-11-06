
//////////////////// IMPORTS ///////////////////////

const path    = require('path');
      // secrets = require('../secrets');

//////// ENVIRONMENT-DEPENDENT CONSTANTS ///////////

const PROD      = process.env.NODE_ENV === 'production';

const REMOTE    = process.env.NODE_LOCATION === 'remote';

const CERT_DIR  = process.env.codeflower_cert_dir ||
                  path.join(__dirname, '../../sslCert/');

///////////////////// EXPORT ///////////////////////

module.exports = {

  // protocols: {
  //   HTTP: REMOTE ? 'http' : 'https',
  //   WS:   REMOTE ? 'ws' : 'wss'
  // },

  protocols: {
    HTTP: 'http',
    WS: 'ws'
  },

  ports: {
    HTTP: REMOTE ? 80 : 8000,
    WS:   REMOTE ? 80 : 8000
  },

  paths: {
    repos: path.join(__dirname, '../tmp/repos/'),
    SSL: {
      key:  CERT_DIR + 'privkey.pem',
      cert: CERT_DIR + 'cert.pem'
    }
  },

  endpoints: {
    cloc: 'cloc',
    ping: 'ping'
  },

  responseTypes: {
    update:  'update',
    error:   'error',
    success: 'success'
  },

  errors: {
    ParseError: {
      name: 'ParseError',
      message: 'Your request could not be parsed. Please check the format of the request.',
      statusCode: 400
    },
    EndpointNotRecognized: {
      name: 'EndpointNotRecognized',
      message: 'Please check your endpoint.',
      statusCode: 404
    },
    MethodNotAllowed: {
      name: 'MethodNotAllowed',
      message: 'The HTTP server accepts only GET and POST requests.',
      statusCode: 405
    },
    NeedOwnerAndName: {
      name: 'NeedOwnerAndName',
      message: 'The owner and name of a repo are required parameters.',
      statusCode: 400
    },
    NeedCredentials: {
      name: 'NeedCredentials',
      message: 'A github username and password are required to access this repo.',
      statusCode: 401
    },
    CredentialsInvalid: {
      name: 'CredentialsInvalid',
      message: 'The given github username/password combination is invalid.',
      statusCode: 401
    },
    RepoNotFound: {
      name: 'RepoNotFound',
      message: 'The given repo could not be found.',
      statusCode: 404
    },
    BranchNotFound: {
      name: 'BranchNotFound',
      message: 'The given branch could not be found',
      statusCode: 404
    }
  },

  cloc: {
    dataFile: 'data.cloc',
    ignoredFile: 'ignored.txt'
  },

  github: {
    // creds: secrets.github.creds,
    // webhookSecret: secrets.github.webhookSecret
  },

  sendgrid: {
    // email: secrets.sendgrid.email,
    // apiKey: secrets.sendgrid.apiKey
  },

  // pm2: {
  //   apps: [{
  //     name:             'codeflower',
  //     script:           './server',
  //     exec_mode:        'cluster',
  //     instances:        4,
  //     watch:            false,
  //     error_file:       'logs/err.log',
  //     out_file:         'logs/out.log',
  //     merge_logs:       true,
  //     log_date_format:  'YYYY-MM-DD HH:mm:ss',
  //     wait_ready:       true,
  //     env: {
  //       autohook: {
  //         repoOwner:    'code-flower',
  //         repoName:     'cloc-server',
  //         repoBranch:   'master',
  //         protocol:     'http',
  //         hostName:     '',
  //         port:         9000,
  //         sslKeyPath:   CERT_DIR + 'privkey.pem',
  //         sslCertPath:  CERT_DIR + 'cert.pem',
  //         gitUsername:  secrets.github.creds.username,
  //         gitPassword:  secrets.github.creds.password,
  //         hookCommand:  'git pull && npm install && pm2 trigger pm2-cautious-actions reload codeflower',
  //         hookSecret:   secrets.github.webhookSecret
  //       }
  //     }
  //   }]
  // },

  logLevel: 2,

  emailUnhandledErrors: PROD,

  deleteAfterClone: true

};
