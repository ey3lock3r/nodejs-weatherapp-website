console.log('Client side javascript file is loaded.')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    url = 'http://localhost:3000/weather?address=' + location

    messageOne.textContent = ''
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then(({error, forecast, location} = {}) => {
            if (error) {
                return messageOne.textContent = error
            }
            messageOne.textContent = location
            messageTwo.textContent = forecast
        })
    })
})