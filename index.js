const { query } = require('express')
const express = require('express')
require('mongoose')
require('./mongoose')
const User = require('./model.js')
var cors = require('cors')
var bodyParser = require('body-parser')

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

app.use(express.json())

var schema={sensor_id:1, creation_date:1, height:1,fall:1}

var schema_fall={ fall:1}


app.get('/smartcontainer/currentDate',function (req, res) {
    var date1=new Date()
    var date2=new Date()
    
    if(Object.keys(req.query).length === 0)
    {
        date2.setDate(date2.getDate()+1)
    }
    else{
        date2=new Date(req.query.date1)
        date1=new Date(req.query.date1)
        date2.setDate(date1.getDate()+1)
    }
    
    date3=new Date(date1.setTime(date1.getTime()+date1.getTimezoneOffset()*60*1000));
    date4=new Date(date2.setTime(date2.getTime()+date2.getTimezoneOffset()*60*1000));
    console.log(date3)
    console.log(date4)
    User.find({"creation_date": {$gte:date1.toISOString(),$lte:date2.toISOString()}},schema).then((user) => {
        // console.log(user)
    res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
  
app.get('/smartcontainer/range', (req, res) => {

var date1=new Date(req.query.date1).toISOString()
var date2=new Date(req.query.date2).toISOString()

 date3=new Date(date1.setTime(date1.getTime()+date1.getTimezoneOffset()*60*1000));
 date4=new Date(date2.setTime(date2.getTime()+date2.getTimezoneOffset()*60*1000));

    User.find({"creation_date": {"$gte":date3, "$lte":date4}}).then((user) => {
  
  console.log(user)
    res.status(201).send(user)
}).catch((e) => {
    res.status(400).send(e)
    })
})

app.use(bodyParser.urlencoded({ extended: true }));
app.post("/smartcontainer/insert", (req, res) => {

    req.body.creation_date=new Date().toISOString() 
    // console.log(req.body.creation_date)
    const user = new User(req.body)
    // console.log(user)


    // console.log(user)
    user.save().then(() => {
    res.send(user)
    }).catch((e) => {
    res.status(400).send(e)
})
        

})

app.get('/smartcontainer/currentDate_fall',function (req, res) {
    var date1=new Date()
    var date2=new Date()
    
    if(Object.keys(req.query).length === 0)
    {
        date2.setDate(date2.getDate()+1)
    }
    else{
        date2=new Date(req.query.date1)
        date1=new Date(req.query.date1)
        date2.setDate(date1.getDate()+1)
    }
    
    date3=new Date(date1.setTime(date1.getTime()+date1.getTimezoneOffset()*60*1000));
    date4=new Date(date2.setTime(date2.getTime()+date2.getTimezoneOffset()*60*1000));
    console.log(date3)
    console.log(date4)
    User.find({"creation_date": {$gte:date1.toISOString(),$lte:date2.toISOString()}},schema_fall).then((user) => {
        // console.log(user)
    res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})


app.post("/smartcontainer/insert_fall", (req, res) => {

    req.body.creation_date=new Date().toISOString() 
    // console.log(req.body.creation_date)
    const user = new User(req.body)
    // console.log(user)


    // console.log(user)
    user.save().then(() => {
    res.send(user)
    }).catch((e) => {
    res.status(400).send(e)
})
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
