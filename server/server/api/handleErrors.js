
//////////// IMPORTS ////////////

const config = require('@config'),
      Log = require('@log'),
      sendAlert = require('@util/sendAlert');

//////////// PRIVATE ////////////

function handleErrors(error, onError) {
  Log(2, 'Handling Errors');

  // is the error listed in the config?
  let isClientError = (
    Object.values(config.errors)
      .map(e => e.name)
      .indexOf(error.name) !== -1
  );

  if (isClientError) {

    let errData = (error.repo && error.repo.fNameBr) ||
                  (typeof error.endpoint !== 'undefined' && '/' + error.endpoint);
    Log(1, 'ERROR:', error.name, errData || '');
    onError(error);

  } else {

    // replace username and password, if any, in stack trace
    if (error.stack)
      error.stack = error.stack.replace(/https:\/\/.*?@/g, 'https://******:******@');

    Log('error', error);

    onError({
      name: 'ServerError',
      statusCode: 500,
      stack:  error.stack,
      params: error.params,
      repo:   error.repo
    });

    if (config.emailUnhandledErrors) {
      let errorEmail = (
        '<!DOCTYPE html><html><body>' +
          '<h3>Stack Trace</h3>' +
          '<p>' + (error.stack || '').replace(/\n/g, '<br/>') + '</p>' +
          '<h3>Request Params</h3>' +
          '<p>' + JSON.stringify(error.params || '') + '</p>' +
        '</body></html>'
      );
      sendAlert('codeflower: cloc-server error', errorEmail);
    }
  }
}

//////////// EXPORTS ////////////

module.exports = handleErrors;
