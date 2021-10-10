// for pounding the server

//////////////////// IMPORTS //////////////////////

require('module-alias/register');

const config = require('@config'),
      { httpReq, wsReq, showResponse } = require('./_common'),
      argv = require('minimist')(process.argv);

////////////////// TEST REPOS /////////////////////

const TESTS = [{
  endpoint: 'cloc',
  params: {
    owner:  'code-flower',
    name:   'client-web',
    branch: ''
  }
},{
  endpoint: 'cloc',
  params: {
    owner:  'code-flower',
    name:   'client-web',
    branch: 'new-ui'
  }
},{
  endpoint: 'cloc',
  params: {
    owner:  'Unitech',
    name:   'pm2',
    branch: ''
  }
},{
  endpoint: 'cloc',
  params: {
    owner:    'jmensch1',
    name:     'sutter-quiz',
    branch:   'releases/1.0',
    creds:    config.github.creds,
  }
}];

///////////////////// MAIN //////////////////////////

let iterations = argv.iter || 10,
    testNum = argv.n || 0,
    reqFunc = argv.http ? httpReq : wsReq;

for (var i = 0; i < iterations; i++)
  reqFunc({ request: TESTS[testNum] }).then(showResponse);

