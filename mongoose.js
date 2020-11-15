const mongoose = require('mongoose')

const uri=process.env.MONGODB_URI||'mongodb+srv://manish:mGrgBs6GFraFV9AN@smartbuilding-gys5z.mongodb.net/smartBuilding?retryWrites=true&w=majority'

mongoose.connect(uri, {
useNewUrlParser: true,
useCreateIndex: true
}).then(()=>{
    console.log(`connection to database established`)
}).catch(err=>{
    console.log(`db error ${err.message}`);
    process.exit(-1)
})
