const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const messageOut = document.querySelector('#message-out')
const locationMessage = document.querySelector('#location')

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchLocation = encodeURIComponent(search.value)

    locationMessage.textContent = ''
    messageOut.textContent = "Loading..."

    fetch(`/weather?address=${searchLocation}`).then((response) => {
        response.json().then((body) => {
            if (body.error) {
                console.log(body, error)
                messageOut.textContent = ''
                errorMessage.textContent = `${error}`
            } else {
                let { name, region, description, temperature, conjunction, feelsLike, localTime } = body.data
                console.log(body.data)
                locationMessage.textContent = `${name}, ${region}`
                messageOut.textContent = `The weather is ${description} with a temperature of ${temperature}℉ ${conjunction} feels like ${feelsLike}℉The local time is ${localTime}`
            }
        })
    })
})