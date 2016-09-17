


exports.sendEmail = function(data) {
  var helper = require('sendgrid').mail;
  var fromEmail = new helper.Email('ollynov@gmail.com');
  var toEmail = new helper.Email(data.email);
  var subject = 'You are subscribed to News Juice';
  var content = new helper.Content('text/plain', data.firstname + ' you are now subscribed to the famous News Juice daily trends digest email');
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

  // ****************** dynamic components ***********************

  // *******************************************************

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });
  sg.API(request, function(error, response) {
    console.log('here is our response ===>', response.body);
  });
};
