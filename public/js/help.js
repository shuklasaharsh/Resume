console.log('JS Loaded')
//get the form by its id
const form = document.getElementById("contact-form");
const Reply = document.querySelector("#message-help");
//1.
form.addEventListener("submit", (event) => {
    event.preventDefault();

    //2.
    let mail = new FormData(form);

    //3.
    sendMail(mail, Reply)


})

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    let mail = new FormData(form);
    sendMail(mail, (call)=>{
        console.log(call)
    })

})
const sendMail = (mail, Reply) => {
    Reply.textContent = 'Loading...'
    fetch("/send", {
        method: "post",
        body: mail,
    }).then((response) => {
        response.json().then((data) =>{
            return Reply.textContent = 'Mail sent successfully!'
        })
    });
};