// takes a chunk of repos from the github trending page,
// and sends them to the cloc server all at once

////////////////// IMPORTS ////////////////////

require('module-alias/register');

const config = require('@config'),
      https = require('https'),
      { httpReq, wsReq, showResponse } = require('./_common'),
      argv = require('minimist')(process.argv);

////////////////// CONFIG /////////////////////

// this can end with 'daily', 'weekly', or 'monthly'
const TRENDING_URL = 'https://github.com/trending?since=daily';

///////////////// FUNCTIONS ///////////////////

function getReposFromHTML(html) {
  let regex = /d-inline-block\scol-9[\s\S]*?href="\/(.*?)">/g,
      matches = [],
      match = regex.exec(html);

  while (match != null) {
    matches.push(match[1]);
    match = regex.exec(html);
  }

  return matches.map(repo => {
    let [owner, name] = repo.split('/');
    return { owner, name };
  });
}

function getTrendingRepos(numRepos) {
  return new Promise((resolve, reject) => {
    https.get(TRENDING_URL, res => {
      let html = '';
      res.on('data', (chunk) => { html += chunk; });
      res.on('end', () => {
        let repos = getReposFromHTML(html);
        resolve(repos.slice(0, numRepos));
      });
    });
  });
}

/////////////////// MAIN //////////////////////

let reqFunc = argv.http ? httpReq : wsReq,
    numRepos = argv.n || 10;

getTrendingRepos(numRepos).then(repos => {
  console.log("TOP REPOS:");
  console.log(repos);

  repos.forEach(repo => {
    let request = {
      endpoint: 'cloc',
      params: repo
    };
    reqFunc({ request }).then(showResponse);
  });
});
