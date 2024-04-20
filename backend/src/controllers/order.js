const createHttpError=require('http-errors')
const bcrypt= require('bcrypt');
const OrderModel=require('../model/order')

exports.create =async (req, res,next)=>{
    const{
        buyer,
        art,
        quantity,
        description,
        address
    }=req.body;
    
    try{
        const{pdf}=req.files;
        if(!pdf){
            throw createHttpError(404, "pdf not found")
        };
       
        let filepath = __dirname + '../../../public/pdfs/' + pdf.name
        pdf.mv(filepath);

        let filepathtoUpload ='/public/pdfs/' + pdf.name

        if(!buyer|| !art|| !quantity || !description || !address){
            throw createHttpError(400, 'Please provide all the required fields');   
        } 

        const buyerId=mongoose.Types.ObjectId(buyer);
        const artId=mongoose.Types.Object(product);

        const order =new OrderModel({
            buyer:buyerId,
            art:artId,
            quantity,
            total:Quantity*art.price,
            date:Date.now(),
            orderstatus:'pending',
            file:filepathtoUpload,
            description,
            address
        });

        const result =await order.save();
        res.status(201).send(result);


    }catch(error){
        next(error);

    }

    
}

exports.getOrderBySeller =async(req, res,next)=>{
    const sellerId=req.params.id;
    try{
        const orders= await OrderModel.find({seller:sellerId}).populate('buyer').populate('art').exec();
        res.send(orders);

    }catch(error){
        next(error)
    }
}

exports.getOrderByBuyer =async(req, res,next)=>{
    const buyerId=req.params.id;
    try{
        const orders= await OrderModel.find({buyer:buyerId}).populate('buyer').populate('art').exec();
        res.send(orders);

    }catch(error){
        next(error)
    }
}