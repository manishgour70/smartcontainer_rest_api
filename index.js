const { query } = require('express')
const express = require('express')
require('mongoose')
require('./mongoose')
const User = require('./model.js')
var cors = require('cors')
// var bodyParser = require('body-parser')

const app = express()
app.use(cors())
const port = process.env.PORT || 3000

app.use(express.json())

var schema={sensor_id:1, creation_date:1, height:1}


app.get('/smartcontainer/currentDate',function (req, res) {
    
    if(Object.keys(req.query).length === 0)
    {
    var date2=new Date()
    var date1=new Date()
    date1.setDate(date1.getDate()+1)
    }
    else{
    var date2=new Date(req.query.date1)
    var date1=new Date(req.query.date1)
    date1.setDate(date1.getDate()+1)
}
    
    User.find({"creation_date": {$gt:date2.toISOString(),$lte:date1.toISOString()}},schema).then((user) => {
        // console.log(user)
    res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})
  
app.get('/smartcontainer/range', (req, res) => {

var date1=new Date(req.query.date1).toISOString()
var date2=new Date(req.query.date2).toISOString()
    
User.find({"creation_date": {"$gte":date1, "$lte":date2}}).then((user) => {
  
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

    
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
