import AppError from './globalError.js';
import model from './model.js';
import redis from './redis.js';
import validUrl from 'valid-url';
import axios from 'axios';
import shortid from 'shortid';
import { parse } from 'dotenv';


//  Try Catch Block 
export function catchAsync(con){
    return (req,res,next)=>{
        return Promise.resolve(con(req,res,next)).catch(next)
    }
}


//    Create A Short Url  Post Api

export default catchAsync(async function createShortUrl(req,res,next){
    if(!validUrl.isUri(req.body.url)) return next(new AppError(`Enter A Valid Url !` , 400))
    await axios.get(req.body.url).catch((err)=> {
     return next(new AppError('In-Valid Url !' , 400))
    })
    
    // console.log(axData)
   
    const baseUrl = 'http://localhost:5000/'
    const urlCode = shortid.generate().toLowerCase() 
    const shortUrl = baseUrl + urlCode

    const obj = { urlCode : urlCode , longUrl : req.body.url , shortUrl : shortUrl }

    const data =   await model.create(obj)
    const response = {  status : true , message : 'Data From DataBase' , data : data }

    await redis.set(`${urlCode}` , JSON.stringify(response.longUrl))

    console.log(response.message , Date.now())
    return res.status(209).json(response)
  }
)

//  Redirect the Short URL to Main Url --

export const redirectUrl = catchAsync( async function(req,res,next){

        const urlCode = req.params.urlCode

        // fetch from Redis 
        const redisData = await redis.get(urlCode)
        if(redisData){
            console.log(' Data From Cache Memory Redis  !' , redisData )
            return res.redirect(JSON.parse(redisData))
        }else{
            const response = await model.findOne({urlCode : urlCode})
            await redis.set(`${urlCode}` , JSON.stringify(response.longUrl))
            console.log(' Data From data base !')
            return res.redirect(response.longUrl)
        }
    }    
)

 