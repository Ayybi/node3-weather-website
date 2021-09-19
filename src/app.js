const path = require('path')
const express = require('express')
const hbs =  require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
// console.log(__dirname, '../../public')
// console.log(path.join(__dirname, '../public'))
// console.log(__filename)

const app = express()

const port = process.env.PORT || 3000
const publicDirPath = path.join(__dirname, '../public')



//to get the customize dir for views not with a specfic name only
const viewsPath = path.join(__dirname,'../templates/views')

//to custtomize partials dir
const partialsPath = path.join(__dirname,'../templates/partials')

//setting handlebars engine and view location
app.set('view engine','hbs')

//to get the customize dir for views not with a specfic name only
app.set('views', viewsPath)

//to set partials
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirPath))

//syntax to get the hbs file in server
app.get('', (req, res) => {
     res.render('index',{
         title: 'Weather App',
         name: 'Abhishek'
     })
})

app.get('/about', (req, res) => {
     res.render('about', {
         title: 'Weather App',
         name: 'Abhishek'
     })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather App',
        name: 'Abhishek',
        helpText: 'This is the help section....'
    })
})

// //for app.com page
// app.get('',(req, res) => {
//    res.send('<h1>Hello express</h1>')
// })
// //on browser localhost:3000



// //app.com/help page
// app.get('/help',(req, res) => {
//     //sending JOSN
//     // res.send({
//     //     name: 'Abhishek',
//     //     age: 26
//     // })

//     //sending array of objects
//     res.send([
//         {
//             name: 'Abhishek',
//             age: 26
//         },
//         {
//             name: 'Renu',
//             age: 26
//         }
//     ])
//  })
//  //express automatically stringfy the JSON in string
// //on browser localhost:3000/help





// //app.com/about
// app.get('/about',(req, res) => {
//     res.send('<h1>This site is about the weather</h1>')
//  })
// //on browser localhost:3000/about





//app.com/weather
 app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Kindly provide an address'
        })
                         }
         
      geocode(req.query.address,(error,{latitude,logitutde,location}={}) => {
          if(error){
              return res.send({
                  error: 'Kindly provide with the right address'
              })

          }
          forecast(latitude,logitutde, (error, forecastdata) => {
              if(error){
                  return res.send({
                      error: 'Kindly send the right coordinates'
                  })

              }

              res.send({
                  forecast: forecastdata,
                  location,
                  address: req.query.address
              })
          })
      })


                  })

        
    
 
//on browser localhost:3000/weather

//query string
app.get('/product',(req, res) => {

      if(!req.query.search){
          return res.send({
              error: 'Please provide with a search term'
          })
      }
      //we cn use else and return in if to prevent from using the res two times in the code


    console.log(req.query)
    //to get particular value from query string / url
    console.log(req.query.search)
    res.send({
        products: []
    })
 })

//to get('/help/*') this will get the url in which /help/ has anything in it
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Abhishek',
        errorMessage: 'Help article not found'
    })
})


//get('*') is used to give the pages which r not in any category a single defination and in last only
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Abhishek',
        errorMessage: 'Page not found'
    })
})

//to start the server
app.listen(port, () => {
    console.log('The server is up on port '+port)
})







//imp--- to restart evertime a server whenever the change happens in any extention file not just js
//synatax in cmd ---- nodemon src/app.js -e js.hbs