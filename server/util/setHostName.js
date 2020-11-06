
/////////////////// IMPORTS ////////////////////

const fs = require('fs');

////////////////// FUNCTIONS ///////////////////

// set the HOSTNAME environment variable based on
// the contents of the /etc/hosts file. This is used
// to send back the host name in the /ping response,
// which is useful for testing the load balancer.
function setHostName() {
  let hostsText = fs.readFileSync('/etc/hosts', 'utf8');
  let match = hostsText.match(/127\.0\.1\.1\s(.*?)\s/);
  if (match)
    process.env.HOSTNAME = match[1];
}

/////////////////// EXPORTS ////////////////////

module.exports = setHostName;
