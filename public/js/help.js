console.log('JS FILE LOADED')
const helpForm = document.querySelector('form')
const send = document.querySelector('input')
const email = document.querySelector('#email')
const subject = document.querySelector('#emailSubject')
const messageHelp = document.querySelector('#message-help')
helpForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    console.log(send.value)
    console.log(email.value)
    let sendData = send.value + '\n\nEMAIL:' + email.value
    console.log(sendData)
    messageHelp.textContent = "Loading..."
    const mailURL = 'http://localhost:3000/help/mail?mailString=' + send.value + '&mailSubject=' + subject.value
    fetch(mailURL).then((response)=>{
        response.then((data)=>{
            messageHelp.textContent = data
        })
    })
})