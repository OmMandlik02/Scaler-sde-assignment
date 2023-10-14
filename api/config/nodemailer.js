const nodeMailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

let transporter = nodeMailer.createTransport({
    // service:'gmail',    // This line will causes problem in dealyed jobs
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'classroomom1@gmail.com',
        pass: 'lywonlqrhygdeoef'
    }
})

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mails', relativePath),
        data,
        function (err, template) {
            if (err) {
                console.log(err);
                return
            }
            mailHTML = template
        }
    )
    return mailHTML
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
