const weatherFrom = document.querySelector('form')
const search = document.querySelector('input')
const errorMessage = document.querySelector('#error-message')
const messageOut = document.querySelector('#message-out')
const locationMessage = document.querySelector('#location')
// const timeMessage = document.querySelector('#time')

const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

console.log(tz);

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchLocation = encodeURIComponent(search.value)

    locationMessage.textContent = ''
    // time.textContent = ''
    messageOut.textContent = "Loading..."

    fetch(`/weather?address=${searchLocation}`).then((response) => {
        response.json().then((body) => {
            // let { location, forecast, time } = body.data
            let { location, forecast } = body.data

            locationMessage.textContent = location
            messageOut.textContent = forecast
            // timeMessage.textContent = time
            // console.log(time);
        }).catch((err) => {
            console.log(body, err)
            messageOut.textContent = `${err}`
        })
    })
})