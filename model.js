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
    },
    fall:{
        type:String
    }
,},'smartcontainer')

module.exports=sc
