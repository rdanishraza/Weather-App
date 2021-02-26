const express  = require('express')
const path = require('path')
const hbs = require('hbs')
//const request = require('request')
// const geocode = require('./utils/geocode.js')
// const forecast = require('./utils/forecast.js')
//const { title } = require('process')

//define the path for express config
const app = express()
const publicFileDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../template/views') //join the template directory
const partialPath = path.join(__dirname, '../template/partials')

//setup handlebar engine and view location
app.set('view engine', 'hbs')  //set up hbs in js file
app.set('views', viewPath) 
hbs.registerPartials(partialPath)

app.use(express.static(publicFileDirectory))

app.get('',(req, res) =>{
    res.render('index',{ //no need to provide extension express will 
        'title':'Weather',  //search in view folder automatically.
        name:'Danish'
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title : "About me", //we can use this title and name in html file
        name:"Danish"       //to make web page dynamic.
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: 'This is some helpful text.',
        title: 'help',
        name : 'Danish'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404', {
        title: '404',
        name:'Danish',
        errorMessage:'help content is not available.'
    })
})

app.get('/weather',(req,res) =>{ //we can pass array as JSON data.
    if(!req.query.address){
        return res.send({     //here we have to use return statement either one of the res.send()
            //statement beacuse at the same time we can't send two different data to the browser.
            error: 'You must provide an address'
        })
    }

    // geocode(req.query.address, (error, {lattitude, longitude, location}) =>{
    //     if(error){
    //         return res.send({error})
    //     }

    //     forecast(lattitude, longitude, (error, forecastData)=>{
    //         if(error){
    //             return res.send({error})
    //         }
    //         res.send({
    //             forecast : forecastData,
    //             location,
    //             address : req.query.address
    //         })
    //     })
    // })

    res.send([{
        weather : 'rainy'
    },
    {
        location: 'Delhi'
    },{
        address : req.query.address
    }])

  })

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'Please provide some address'
        })

    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        'title': '404',
        name: 'Danish',
        errorMessage: 'page not found'
    })
})

app.listen(3000, ()=>{
    console.log('server running on port 3000')
})