
var helper = require('sendgrid').mail;
var fromEmail = new helper.Email('ollynov@gmail.com');
var toEmail = new helper.Email('ollynov@gmail.com');
var subject = 'FROM YOSH AGAIN';
var sendGridKeys = require('../../keys.js').sendgrid;
var sg = require('sendgrid')(sendGridKeys.SENDGRID_API_KEY);

// ****************** dynamic components ***********************

// *******************************************************



var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

exports.sendEmail = function(data) {

  var content = new helper.Content('text/plain', data);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log('here is our response ===>', response.body);
    console.log(response.headers);
  });
};
