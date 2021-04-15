const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY = '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'
sgMail.setApiKey(SENDGRID_API_KEY);
module.exports = sgMail
