console.log('JS FILE LOADED')

/**/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageLocation = document.querySelector('#message-location')
const messageForecast = document.querySelector('#message-forecast')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageLocation.textContent = 'Loading...'
    messageForecast.textContent = ''
    const weatherUrl = '/weather?location=' + location
    fetch(weatherUrl).then((response) => {
        response.json().then((data)=> {
            if (data.error) {
                if(data.error.info) {
                    const send = JSON.stringify(data.error.info)
                    return messageLocation.textContent = send
                }
                const send = data.error
                messageLocation.textContent = send
                return console.log(data.error)
            }
            messageLocation.textContent = 'Location: ' + data.location.location + ' Coordinates: ' + data.location.coordinates
            messageForecast.textContent = 'It is currently ' + data.currentTime + ' in ' + location + ' and the temperature is ' + data.temperature +
                ' it feels like ' + data.feelsLike + ' with a ' + data.precipitation + ' precipitation value.'
        })
    })
})
