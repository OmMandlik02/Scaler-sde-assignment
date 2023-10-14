const nodeMailer = require('../config/nodemailer')

module.exports.newComment = function (data) {
    console.log(data.email)
    nodeMailer.transporter.sendMail({
        from: 'SocialChat',
        to: data.email,
        subject: 'New comment is added',
        html: `<h1>You have got ${data.Ideation + data.execution + data.Viva} mark</h1>`
    }).then(function (data, err) {
        if (err) {
            console.log(err);
            return err
        }
        console.log(data);
        return;
    })
}

