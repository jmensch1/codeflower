// for testing individual clone requests during development

//////////////////// IMPORTS //////////////////////

require('module-alias/register');

const config = require('@config'),
      { httpReq, wsReq, showResponse, showError } = require('./_common'),
      argv = require('minimist')(process.argv);

////////////////// TEST REPOS /////////////////////

const TESTS = [{
  endpoint: 'cloc',
  params: {
    owner: 'code-flower',
    name:  'client-web',
    branch: ''
  }
},{
  endpoint: 'cloc',
  params: {
    owner: '',
    name:  'client-web',
    branch: 'masters'
  }
},{
  endpoint: 'cloc',
  params: {
    owner: 'code-flower',
    name:  'client-web',
    branch: 'new-ui'
  }
},{
  endpoint: 'cloc',
  params: {
    owner: 'addgatsby',
    name:  'gatsby-api',
    branch: ''
  }
},{
  endpoint: 'moose',
  params: {
    owner: 'code-flower',
    name:  'client-web',
    branch: ''
  }
},
'raw string',
{
  endpoint: 'cloc',
  params: {
    owner: 'code-flower',
    name:  'pm2',
    branch: ''
  }
},{
  endpoint: 'cloc',
  params: {
    owner: 'jmensch1',
    name:  'sutter-quiz',
    branch: 'releases/1.0',
    creds: {
      token: ''
    },
  }
},{
  endpoint: 'cloc',
  params: {
    owner: 'jmensch1',
    name:  'sutter-quiz',
    branch: 'releases/1.0',
    creds: config.github.creds,
  }
},{
  endpoint: 'cloc',
  params: {
    owner: 'tensorflow',
    name: 'tensorflow',
    branch: ''
  }
}];

///////////////////// MAIN ////////////////////////

let reqFunc = argv.http ? httpReq : wsReq,
    testNum = argv.n || 0,
    test = TESTS[testNum],
    isString = typeof test === 'string';

reqFunc({request: test, onUpdate: console.log, sendRaw: isString})
  .then(showResponse)
  .catch(showError);



