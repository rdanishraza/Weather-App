const { response } = require("express")

// console.log('hey! this is java script file')

// fetch('http://puzzle.mead.io/puzzle').then((response) =>{ 
//     response.json().then((data) =>{
//         console.log(data)
//     })
// })
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1') // # will access the class name from index file
const messageTwo = document.querySelector('#message-2') // id of second paragraph in index.hbs file
messageOne.textContent = 'From JavaScript' //we can use to print message on website


weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault() 

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=location').then((response) =>{ 
        //it means fetch data from the url and then response
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent = data.error 
        }else{
            messageTwo.textContent = data.location
            messageTwo.textContent = data.forecast
          }
      })
  })
})