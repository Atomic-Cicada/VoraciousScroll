var helper = require('sendgrid').mail;
var fromEmail = new helper.Email('ollynov@gmail.com');
var toEmail = new helper.Email('ollynov@gmail.com');
var subject = 'FROM YOSH AGAIN';
var content = new helper.Content('text/plain', 'Hello, there!');
var mail = new helper.Mail(fromEmail, subject, toEmail, content);
var sendGridKeys = require('../../keys.js').sendgrid;
// process.env.SENDGRID_API_KEY
var sg = require('sendgrid')(sendGridKeys.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

exports.sendEmail = function() {
  console.log('ok in here at least');
  sg.API(request, function(error, response) {
    console.log(response.statusCode);
    console.log('here is our response ===>', response.body);
    console.log(response.headers);
  });
};
