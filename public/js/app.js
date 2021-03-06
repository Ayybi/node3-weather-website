

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
            console.log(data)
    })
})

// fetch('http://localhost:3000/weather?address=Delhi').then((response) => {
//     response.json().then((error,data) => {
//             if(error){
//                 return console.log(error)
//             }
//            console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=Delhi').then((response) => {
//     response.json().then((data) => {
//             if(data.error){
//                  console.log(data.error)
//             }
//             else{
//                 console.log(data.location)
//                 console.log(data.forecast)
//             }
           
//     })
// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

// const message = document.querySelector('.classname')
// const messageOne = document.querySelector('#message-1')

// messageOne.textContent = 'From JavaScript'

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

  const messageOne = document.querySelector('#message-1')
  const messageTwo = document.querySelector('#message-2')

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
//fetch('http://localhost:3000/weather?address='+location)

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
                if(data.error){
                     console.log(data.error)
                     messageOne.textContent = data.error
                }
                else{
                    messageOne.textContent = data.location
                    messageTwo.textContent = `${data.forecast.weather_description} and the temperature is ${data.forecast.temperature} and the humidity is around ${data.forecast.humidity}`
                    console.log(data.location)
                    
                    console.log(data.forecast)
                    
                }
               
        })
    })

       console.log(location)
})