// this is for testing all of the various params/responses for clone requests.

//////////////////// IMPORTS //////////////////////

require('module-alias/register');

const config = require('@config'),
      { httpReq, wsReq, testResponse } = require('./_common'),
      argv = require('minimist')(process.argv);

//////////////////// CONSTANTS ////////////////////

const RES_TYPES = config.responseTypes;
const ERRORS = config.errors;

///////////////// TEST REQUESTS ///////////////////

// ws and http
const TESTS = [{
  request: {
    endpoint: 'cow',
    params: {
      owner: 'code-flower',
      name: 'client-web',
      branch: ''
    }
  },
  test: {
    desc: 'Invalid endpoint.',
    expect: res => res.type === RES_TYPES.error &&
                   res.data.name === ERRORS.EndpointNotRecognized.name
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner: 'code-flower',
      name: '',
      branch: 'master'
    }
  },
  test: {
    desc: 'Repo name not provided.',
    expect: res => res.type === RES_TYPES.error &&
                   res.data.name === ERRORS.NeedOwnerAndName.name
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner:  'code-flower',
      name:   'test-repo-1',
      branch: ''
    }
  },
  test: {
    desc: 'Public repo with default branch of not-master, no branch specified, no creds.',
    expect: res => res.type === RES_TYPES.success &&
                   res.data.branch === 'not-master' &&
                   res.data.lastCommit === 'ba2a2fd68c243bb5cfe4907d3adbce8e0d4b29fa'
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner:  'code-flower',
      name:   'test-repo-1',
      branch: 'not-master'
    }
  },
  test: {
    desc: 'Public repo with default branch of not-master, not-master branch specified, no creds.',
    expect: res => res.type === RES_TYPES.success &&
                   res.data.branch === 'not-master' &&
                   res.data.lastCommit === 'ba2a2fd68c243bb5cfe4907d3adbce8e0d4b29fa'
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner:  'code-flower',
      name:   'test-repo-1',
      branch: 'master'
    }
  },
  test: {
    desc: 'Public repo with default branch of not-master, master branch specified, no creds.',
    expect: res => res.type === RES_TYPES.success &&
                   res.data.branch === 'master' &&
                   res.data.lastCommit === '39b7825656927aa5233b13c877e20157ab8c6d2d'
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner:  'code-flower',
      name:   'client-web',
      branch: ''
    }
  },
  test: {
    desc: 'Public repo, no branch specified, no creds.',
    expect: res => res.type === RES_TYPES.success &&
                   res.data.fullName === 'code-flower/client-web'
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner: 'code-flower',
      name: 'client-web',
      branch: 'masters'
    }
  },
  test: {
    desc: 'Public repo, non-existent branch specified, no creds.',
    expect: res => res.type === RES_TYPES.error &&
                   res.data.name === ERRORS.BranchNotFound.name
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner:  'code-flower',
      name:   'client-web',
      branch: 'master'
    }
  },
  test: {
    desc: 'Public repo, valid branch specified, no creds.',
    expect: res => res.type === RES_TYPES.success &&
                   res.data.fullName === 'code-flower/client-web'
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner:  'addgatsby',
      name:   'gatsby-api',
      branch: ''
    }
  },
  test: {
    desc: 'Private repo, no branch specified, no creds.',
    expect: res => res.type === RES_TYPES.error &&
                   res.data.name === ERRORS.NeedCredentials.name
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner: 'Unitech',
      name:  'pm2',
      branch: '',
      username: 'whatthe',
      password: 'hell'
    }
  },
  test: {
    desc: 'Public repo, no branch specified, dummy creds provided.',
    expect: res => res.type === RES_TYPES.success &&
                   res.data.branch === 'master'
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner: 'jmensch1',
      name:  'sutter-quiz',
      branch: 'releases/1.0',
      username: 'wrong',
      password: 'credentials'
    }
  },
  test: {
    desc: 'Private repo, valid branch specified, invalid credentials provided.',
    expect: res => res.type === RES_TYPES.error &&
                   res.data.name === ERRORS.CredentialsInvalid.name
  }
},{
  request: {
    endpoint: 'cloc',
    params: {
      owner: 'jmensch1',
      name:  'sutter-quiz',
      branch: 'releases/1.0',
      username: config.github.creds.username,
      password: config.github.creds.password
    }
  },
  test: {
    desc: 'Private repo, valid branch specified, valid credentials provided.',
    expect: res => res.type === RES_TYPES.success &&
                   res.data.fullName === 'jmensch1/sutter-quiz' &&
                   res.data.branch === 'releases/1.0'
  }
}];

// ws only
const WS_TESTS = [{
  request: 'asdf',
  sendRaw: true,
  test: {
    desc: 'Payload is not valid JSON.',
    expect: res => res.type === RES_TYPES.error &&
                   res.data.name === ERRORS.ParseError.name
  }
}];

// http only
const HTTP_TESTS = [{
  request: {
    endpoint: 'cloc',
    params: 'asdf'
  },
  sendRaw: true,
  test: {
    desc: 'Params are not valid JSON.',
    expect: res => res.type === RES_TYPES.error &&
                   res.data.name === ERRORS.ParseError.name
  }
},{
  request: {
    method: 'PATCH',
    endpoint: 'cloc',
    params: {
      owner: 'code-flower',
      name: 'client-web',
      branch: ''
    }
  },
  test: {
    desc: 'PATCH method used to send request.',
    expect: res => res.type === RES_TYPES.error &&
                   res.data.name === ERRORS.MethodNotAllowed.name
  }
}];

//////////////////// RUN TEST ///////////////////////

let allTests, reqFunc;

if (argv.http) {
  reqFunc = httpReq;
  allTests = TESTS.concat(HTTP_TESTS);
  console.log("\nHTTP tests");
} else {
  reqFunc = wsReq;
  allTests = TESTS.concat(WS_TESTS);
  console.log("\nWS tests");
}

allTests.forEach(test => {
  reqFunc(test).then(res => testResponse(test.test, res));
});
