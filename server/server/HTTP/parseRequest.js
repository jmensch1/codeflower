
//////////// IMPORTS ////////////

const config = require('@config'),
      url = require('url');

//////////// PRIVATE ////////////

function parseRequest(request) {
  return new Promise((resolve, reject) => {

    let urlInfo;
    try {
      urlInfo = url.parse(request.url, true);
    } catch(e) {
      reject(config.errors.ParseError);
    }

    let reqInfo = {
      method: request.method,
      endpoint: urlInfo.pathname.substring(1)
    };

    switch(request.method) {
      case 'GET':
        reqInfo.params = urlInfo.query;
        resolve(reqInfo);
        break;
      case 'POST':
        let body = '';
        request.on('data', data => body += data);
        request.on('end', () => {
          try {
            reqInfo.params = JSON.parse(body);
          } catch(e) {
            reject(config.errors.ParseError);
          }
          resolve(reqInfo);
        });
        break;
      default:
        reject(config.errors.MethodNotAllowed);
        break;
    }
  });
}

//////////// PUBLIC /////////////

module.exports = parseRequest;
