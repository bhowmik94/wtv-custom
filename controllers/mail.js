const mail = require('../mail/mail.config.js')
const resendTemplate = require('../mail/resendPasswordTemplate.js')
var http = require("https");
const fetch = require('node-fetch');

var options = {
  "method": "POST",
  "hostname": "api.sendgrid.com",
  "port": null,
  "path": "/v3/marketing/contacts/search",
  "headers": {
    "authorization": "Bearer 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",
    "content-type": "application/json"
  }
};

let index = (req, res) => {
  res.render('resend_mail', { title: 'Resend Mail', csrfToken: req.csrfToken() });
};

let sendMail = (req, res) => {
  const { email } = req.body
  const token = req.csrfToken()
  fetch('https://api.sendgrid.com/v3/marketing/contacts/search', {
    method: 'POST', // or 'PUT'
    headers: {
      "authorization": "Bearer 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",
      "content-type": "application/json"
    },
    body: JSON.stringify({ query: `email LIKE   '${email}%' AND CONTAINS(list_ids, "6707dec1-cb88-484f-a6df-498b797cdf48")` }),
  })
    .then(response => response.json())
    .then(data => {
      if (!data.result.length) {
        res.render('resend_mail', { title: 'Resend Mail', msg: 'No Registered User Found', csrfToken: token });
      }
      else {
        const d = { firstName: data.result[0].first_name, lastName: data.result[0].last_name, email: data.result[0].email, password: data.result[0].custom_fields.password }
        mail.send(resendTemplate(d), (error, body) => {
          if (error) {
            res.render('resend_mail', { title: 'Resend Password', msg: 'Something goes wrong please try after some time ', csrfToken: token });
          }
          else {
            res.render('resend_mail', { title: 'Resend Password', msg: 'Password has been sent to your registered email address', csrfToken: token });
            //      console.log(body)
          }
        })
      }
    })
    .catch((error) => {
      res.render('resend_mail', { title: 'Resend Password', msg: 'Something goes wrong please try after some time ', csrfToken: token });
      console.error('Error:', error);
    });
};
module.exports = {
  index: index,
  sendMail: sendMail
}
