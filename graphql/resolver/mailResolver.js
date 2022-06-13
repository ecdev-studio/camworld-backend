const nodemailer = require('nodemailer');
const aws = require('@aws-sdk/client-ses');
const axios = require('axios');
const feedbackMail = require('../../emails/feedback');
const dotenv = require('dotenv');

dotenv.config();
const SECRET_MAIL = process.env.SECRET_MAIL;

module.exports = {
  Mutation: {
    async sendMail(root, {data}) {
      let validateResult = false;
      await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${SECRET_MAIL}&response=${data.token}`,
        {
          method: 'POST',
        }).then(function(response) {
        validateResult = response.data.success;
        return response.data.success;
      });
      if (validateResult) {
        const ses = new aws.SES({
          apiVersion: 'latest',
          region: 'us-west-1',
          accessKeyId: process.env.SMTP_USER,
          secretAccessKey: process.env.SMTP_PASSWORD
        });

        const transporter = nodemailer.createTransport({
          SES: {ses, aws},
        });
        await transporter.sendMail(feedbackMail(data), function(error, info) {
          if (error) {
            throw new Error(
              `An error occurred while sending an email!: ${error}`);
          }
          return 'sent';
        });
      }
    },
  },
};