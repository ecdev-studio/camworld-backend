module.exports = function (email) {
  let radio = ''
  let key = ''
  if (email.radioGroup) {
    radio = `<p><strong>Parameter:</strong> ${email.radioGroup}</p>`
  }
  if (email.key) {
    key = `<p><strong>Key:</strong> ${email.key}</p>`
  }
  return {
    to: process.env.MAIL_TO,
    from: process.env.MAIL_FROM,
    subject: 'Proposal Request',
    html: `
            <p><strong>From:</strong> ${email.name} ${email.email}</p>
            <p><strong>Company:</strong> ${email.company}</p>
            <p><strong>Current Website:</strong> ${email.website}</p>
            ${radio}
            <p><strong>Message:</strong> ${email.message}</p>
            ${key}
        `
  }
}