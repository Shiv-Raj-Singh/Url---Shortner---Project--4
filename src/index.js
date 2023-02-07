import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors';
import './database.js';
import {globalError} from './globalError.js';
import createShortUrl , { redirectUrl } from './controller.js';



const app = express()
app.use(express.json())
app.use(cors())

app.post('/url' , createShortUrl )
app.get('/:urlCode' ,redirectUrl )
app.use(globalError)
app.listen(process.env.PORT , ()=>{
    console.log(`App is Running on ${process.env.PORT}`);
})