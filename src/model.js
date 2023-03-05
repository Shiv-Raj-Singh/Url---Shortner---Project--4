import {Schema , model} from 'mongoose';

const urlSchema = new Schema({
    urlCode: {
        type: String, 
        unique : true
    } ,
    longUrl: {
        type: String,
        unique: true, 
    } ,
    shortUrl:{
        type: String, 
        unique: true, 
    }

}, {timestamps : true })

const urlModel = new model("url short" , urlSchema)
export default urlModel
