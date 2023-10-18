const nodeMailer = require('../config/nodemailer')

module.exports.newComment = function (data) {
    nodeMailer.transporter.sendMail({
        from: 'SocialChat',
        to: data.email,
        subject: 'New comment is added',
        html: `<h1>You have got ${data.Ideation + data.Execution + data.Viva} mark out of 30 marks : ${data.Ideation} for Idea , ${data.Execution} for execution & ${data.Viva} for viva</h1>`
    }).then(function (data, err) {
        if (err) {
            return err
        }
        return;
    })
}

