


exports.sendEmail = function(data) {
  var helper = require('sendgrid').mail;
  var fromEmail = new helper.Email('ollynov@gmail.com');
  var toEmail = new helper.Email(data.user.email);
  // var toEmail = new helper.Email(data.user.email);
  var subject = 'You are subscribed to News Juice';
  var htmlBody = "<table style=\"border: solid 1px #fff; background-color: #e3e0cf; font-family: verdana, tahoma, sans-serif; color: #fff;\"> <tr> <td> <h2>Hello " + data.user.firstname + ",</h2> <p>Congrats! You are now signed up to the News Juice Daily Digest email.</p> <a href=\"http://www.google.com\" target=\"_blank\">This is a link to google.com</a> <p> <a href=\"http://www.apple.com\" target=\"_blank\">This is a link to apple.com</a> <p> <a href=\"http://www.sendgrid.com\" target=\"_blank\">This is a link to sendgrid.com</a> </p> <p>Let us know if you have feedback.</p> Love,<br/> Your friends at HackReactor</p> <p> <img src=\"http://cdn1.sendgrid.com/images/sendgrid-logo.png\" alt=\"News Juice!\" /> </td> </tr> </table>";
  var content = new helper.Content('text/html', htmlBody);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);
  var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);

  // ****************** dynamic components ***********************

  // *******************************************************
  console.log('HERE IS DATA', data);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });
  sg.API(request, function(error, response) {
    console.log('here is our response ===>', response);
  });
};

exports.sendDigest = function(data) {
  var helper = require('sendgrid').mail;
  var fromEmail = new helper.Email('ollynov@gmail.com');
  var toEmail = new helper.Email('ollynov@gmail.com');
  var subject = 'News Juice Daily Digest Email';
  var htmlBody = "<table style=\"border: solid 3px #9fa8a3; background-color: #e3e0cf; font-family: verdana, tahoma, sans-serif; color: #fff;\"> <tr> <td> <h2>Hello " + data.user.firstname + ",</h2> <p>Here is your daily dose of News Juice.</p><ul><li><h3>" + data.article.title + "</h3><img src=" + data.article.img + " height='250' width='330'><a href=" + data.article.articleLink +  "target=\"_blank\">Read More.</a></li></ul>  <p> <a href=\"http://www.apple.com\" target=\"_blank\">This is a link to apple.com</a> <p> <a href=\"http://www.sendgrid.com\" target=\"_blank\">This is a link to sendgrid.com</a> </p> <p>Let us know if you have feedback.</p> Love,<br/> Your friends at HackReactor</p> <p> <img src=\"http://cdn1.sendgrid.com/images/sendgrid-logo.png\" alt=\"News Juice!\" /> </td> </tr> </table>";
  var content = new helper.Content('text/html', htmlBody);
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
    console.log('here is our response ===>', response);
  });
};