var helper = require('sendgrid').mail;
var fromEmail = new helper.Email('ollynov@gmail.com');
var toEmail = new helper.Email('ollynov@gmail.com');
var subject = 'Hello World from Yosh and the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(fromEmail, subject, toEmail, content);
// process.env.SENDGRID_API_KEY
var sg = require('sendgrid')('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');
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: mail.toJSON(),
});

sg.API(request, function(error, response) {
  console.log(response.statusCode);
  console.log('here is our response ===>', response.body);
  console.log(response.headers);
});

