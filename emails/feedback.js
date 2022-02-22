module.exports = function (email) {
  let radio = ''
  if (email.radioGroup) {
    radio = `<p><strong>Parameter:</strong> ${email.radioGroup}</p>`
  }
  return {
    to: process.env.MAIL_TO,
    from: process.env.MAIL_FROM,
    subject: 'Proposal Request',
    html: `
            <p><strong>From:</strong> ${email.name} ${email.email}</p>
            <p><strong>Current Website -</strong> ${email.website}</p>
            ${radio}
            <p><strong>Message:</strong> ${email.message}</p>
            <p><strong>Key:</strong> ${email.key}</p>
        `
  }
}