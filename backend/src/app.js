require('dotenv').config()
const express = require('express')
const app = express()
const createHttpError=require('http-errors')
const BuyerRouter =require('./routes/buyer')
const SellerRouter =require('./routes/seller')
const OrderRouter =require('./routes/order')
const fileUpload=require('express-fileupload');
const ArtRouter =require('./routes/art')

app.use(fileUpload());

app.use('/public/arts',express.static('public/arts'))

const cors=require('cors')
app.use(cors())

app.use(express.json());

app.use('/api/v1/buyer', BuyerRouter);
app.use('/api/v1/seller', SellerRouter);
app.use('/api/v1/art', ArtRouter);
app.use('/api/v1/order', OrderRouter);

app.use((err,req,res,next)=>{
    if (createHttpError.isHttpError(err)){
        res.status(err.status).send({message:err.message});
    }else{
        res.status(500).send({message:err.message});
    }
    //error unknown
    res.status(500).send({message:"Error Unknown"})
    
});


module.exports = app;
