const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const messageOut = document.querySelector('#message-out')
const locationMessage = document.querySelector('#location')
const timeMessage = document.querySelector('#time')

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchLocation = encodeURIComponent(search.value)

    locationMessage.textContent = ''
    time.textContent = ''
    messageOut.textContent = "Loading..."

    fetch(`/weather?address=${searchLocation}`).then((response) => {
        response.json().then((body) => {
            if (body.error) {
                console.log(body, error)
                messageOut.textContent = ''
                errorMessage.textContent = `${error}`
            } else {
                let { location, forecast, time } = body.data
                console.log(body.data)
                locationMessage.textContent = location
                messageOut.textContent = forecast
                timeMessage.textContent = time

            }
        })
    })
})