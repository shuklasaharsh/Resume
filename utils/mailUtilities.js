// Npm Modules
const mailer = require('nodemailer')
// Node modules
const fs = require('fs')
// Files
const CONSTANTS_FILE = require('../data/CONSTANTS.js')
const Account = CONSTANTS_FILE.Account


// Program
const loadErrorData = async () => {
    try {
        let errorFile = fs.readFileSync('./errors.json')
        errorFile = errorFile.toString()
        return JSON.parse(errorFile)
    } catch (e) {
        return []
    }
}


const createMail = async (sendTo) => {
    let mailString = "Your server has errors. Please check your code.\nThe log file is attached."
    let subject = "Error in server"
    return {
        from: sendTo,
        to: 'shukla.saharsh7@gmail.com',
        subject: subject,
        text: mailString,
        html: "<p>Your server has errors. Please check your code.<br>The log file is attached.</p>",
        attachments: [
            {
                filename: "errors.json",
                content: fs.createReadStream('./errors.json')
            }
        ],
        envelope: {
            from: 'Error Support <errorsupport@c4projects.com>',
            to: sendTo
        }
    }
}


const sendMailTo = async (sendTo, mailString,subject, callback) => {
    // let username = CONSTANTS.mailDetails.user
    // let password = CONSTANTS.mailDetails.pass
    let testAccount = Account
    let transporter;
    transporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        }
    });

    let message = {
        from: 'shukla.saharsh7.work@gmail.com',
        to: sendTo,
        subject: subject,
        text: mailString,
        html: "<p>Your server has errors. Please check your code.<br>The log file is attached.</p>",
        attachments: [
            {
                filename: "errors.json",
                content: fs.createReadStream('./errors.json')
            }
        ],
        envelope: {
            from: 'Error Support <errorsupport@c4projects.com>',
            to: sendTo
        }
    }
    let info = await transporter.sendMail(message)
    console.log("Response: " + JSON.stringify(info))
    let d = Date.now()
    d = d.toString()
    let logData = {
        TimeStamp: d,
        Response: info
    }
    callback(logData)

    fs.writeFileSync('./log.json', JSON.stringify(logData))
    console.log(logData)
}


module.exports = {
    sendMailTo: sendMailTo,
    createMail: createMail,
    loadErrorData: loadErrorData
}