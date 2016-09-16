


exports.sendEmail = function(data) {
  var helper = require('sendgrid').mail;
  var fromEmail = new helper.Email('ollynov@gmail.com');
  var toEmail = new helper.Email('ollynov@gmail.com');
  var subject = 'FROM YOSH AGAIN';
  var content = new helper.Content('text/plain', data.Article);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);

  // var sendGridKeys = require('../../keys.js').sendgrid;
  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

  // ****************** dynamic components ***********************

  // *******************************************************

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
};
