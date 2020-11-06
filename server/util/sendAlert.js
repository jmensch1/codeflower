
//////////// IMPORTS ////////////

const creds = require('@config').sendgrid,
      sg = require('sendgrid')(creds.apiKey);

//////////// PRIVATE ////////////      

function sendAlert(subject, message) {

  let request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [{
        to: [{
          email: creds.email
        }],
        subject: subject
      }],
      from: {
        email: creds.email
      },
      content: [{
        type: 'text/html',
        value: message
      }]
    }
  });
   
  sg.API(request);
}

//////////// PUBLIC //////////////

module.exports = sendAlert;

