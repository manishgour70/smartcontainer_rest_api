const mongoose=require('mongoose')
const sc=mongoose.model('smartcontainer',{

    sensor_id:{
        type:String
    },
    creation_date:{
        type:Date
    },
    height:{
        type:Number
    }
,},'smartcontainer')

module.exports=sc