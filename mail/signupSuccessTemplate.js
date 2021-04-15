const nodemailer = require("nodemailer");
const defaultText = require('../config/languagesText')

const sendEmail = async (d, password,language) => {
  let transporter = nodemailer.createTransport({
    host: 'mx.world-television.com',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.GMAILUSER, // generated ethereal user
      pass: process.env.GMAILPASSWORD, // generated ethereal password
    },
  });

  try {
    let info = await transporter.sendMail({
      from: '"UNGA" <no-reply-sharestudio@wtvglobal.com>', // sender address
      to: d.email, // list of receivers
      subject: 'Tackling Covid-19 together through the ACT Accelerator - Wednesday 30 September 2020 08.30 EDT - 10.00 EDT', // Subject line
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
       <html  xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: arial,helvetica,sans-serif;
      font-size: 14px;
    }
    body {
      color: #000000;
    }
    body a {
      color: #1188E6;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
      <!--user entered Head Start--><!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; color:#000000; background-color:#FFFFFF;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
            <tr>
              <td valign="top" bgcolor="#FFFFFF" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p></p>
      </td>
    </tr>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="482687a8-f0b8-46e0-81f8-2599d8931e4d">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:10px 10px 10px 10px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="100%" alt="" data-proportionally-constrained="true" data-responsive="true" src="https://streamstudio-backend-staging.s3.eu-west-2.amazonaws.com/united-nations/logo/logo.png">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="67f79e7c-bc6c-44b4-8028-84b2a9e73797" data-mc-module-version="2019-10-22">
    <tbody>
        <tr>
        
        <td style="padding:18px 20px 18px 20px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h3 style="text-align: inherit">${defaultText[language].email.greeting}</h3>
        
        <div text-align: inherit">${defaultText[language].email.eventInfo}</div>
        
        <div  text-align: inherit"><br></div>
        <div text-align: inherit">${defaultText[language].email.loginInstructions}</div>
        <div  text-align: inherit"><br></div>
        <div text-align: inherit"><a href="https://access-for-all.world-television.com/home/${language}"/>https://access-for-all.world-television.com/home/${language}</a></div>
         <div  text-align: inherit"><br></div>
        <div text-align: inherit">${defaultText[language].email.username}: ${d.email}</div>
         <div  text-align: inherit"><br></div>
         <div text-align: inherit">${defaultText[language].email.password}: ${password}</div>
        <div  text-align: inherit"><br></div>
        <div text-align: inherit">${defaultText[language].confirmation.footerInfo}</div>
        <div  text-align: inherit"><br></div>
        <div  text-align: inherit">${defaultText[language].email.thanks}</div>
        <div  text-align: inherit"><br></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>`


    });

  }
  catch(e){
    console.log(e)
    throw new Error('Error')
  }
}



module.exports = sendEmail;




