const createHttpError = require('http-errors')
const bcrypt =require('bcrypt');
const SellerModel= require('../model/seller');
const jwt =require('jsonwebtoken');

exports.login=async(req,res,next)=>{
    const email=req.body.email
    const password=req.body.password

    try{
        if(!email || !password){
            throw createHttpError(400, 'Missing required parameters')

        }

        const seller =await SellerModel.findOne({email:email}).exec();

        if(!seller){
            throw createHttpError(400, 'User not found')

        }
        const isPasswordValid =await bcrypt.compare(password, seller.password);

        if(!isPasswordValid){
            throw createHttpError(400, 'Invalid credentials')
        }


        const user =await SellerModel.findOne({email:email}).exec();

        const token =jwt.sign(
            {
                user_id:user._id,
                email:user.email,
            },
            process.env.JWT_TOKEN_KEY,
            {
                expiresIn:"4h",
            }
        )
        user.token=token;
        const result=await user.save()
        res.status(200).send(result);
        
    }catch(error){
        next(error)
    }
}

exports.register = async (req, res, next)=> {
    const email= req.body.email;
    const password= req.body.password;
    const name= req.body.name;
    try{  
        if(!email|| !password|| !name){
            throw createHttpError(400, 'Missing required parameters')   
        }  
        const isSellerAvailable=await SellerModel.findOne({email:email}).exec();

        if(isSellerAvailable){
            throw createHttpError(400,'Seller already exists');
        }

        const hashedPassword= await bcrypt.hash(password,10);

        const seller =new SellerModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const result = await seller.save();
        res.status(201).send(result);


    }catch(error){
        next(error);

    }

}