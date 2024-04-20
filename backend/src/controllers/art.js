const bcrypt =require('bcrypt');
const ArtModel =require('../model/art')
const mongoose =require('mongoose')
const createHttpError = require('http-errors')


exports.create =async (req, res, next)=>{
    const{
        name,
        description,
        price,
        artistName
    
    }=req.body;
    try{
        const{image}=req.files;
        if(!image){
            throw createHttpError(404, "Image not found")
        };
        console.log(image.mimetype)
        if(!image.mimetype.startsWith('image')){
            throw createHttpError(400, "Only Image are allowed ")
        }
        let filepath = __dirname + '../../../public/arts/' + image.name
        image.mv(filepath);

        let filepathtoUpload ='/public/arts/' + image.name

        if(!name|| !description|| !price || !artistName){
            throw createHttpError(400, 'Please provide all the required fields');   
        }  
        

        const art =new ArtModel({
            name,
            description,
            price,
            artistName,
            image: filepathtoUpload,
        })

        const result = await art.save();
        res.status(201).send(result);


    }catch(error){
        next(error);

    }
    
}

exports.update = async (req, res, next)=>{
    const artId =req.params.id;

    const{
        name,
        description,
        price,
        artistName
    }= req.body;

    try{
        if(!mongoose.isValidObjectId(artId)){
            throw createHttpError(400, "Invalid Id")
        }
        if(!name|| !description|| !price || !artistName){
            throw createHttpError(400, 'Please provide all the required fields');   
        }

        const{image}=req.files;
        let filepath
        let filepathtoUpload;

        if(image){
            if(!image.mimetype.startWith('image')){
                throw createHttpError(400, 'Only image are allowed');
            }
            filepath=__dirname +'../../../public/arts/'+image.name
            image.mv(filepath);
            filepathtoUpload='/public/arts/'+ image.name
        };

        const art =await ArtModel.findById(artId).exec();

        if(!art){
            throw createHttpError(404, 'Art not found');
        }

        art.name=name;
        art.description=description;
        art.price=price;
        art.artistName=artistName;

        if(image){
            art.image=filepathtoUpload;
        }
        const result =await art.save();
        res.status(200).send(result);

    }catch(error){
        next(error)
    }

}

exports.delete =async (req, res, next)=>{
    const artId =req.params.id;
    try{
        if(!mongoose.isValidObjectId(artId)){
            throw createHttpError(400,"Incalid Id")
        }
        const result =await ArtModel.findByIdAndDelete(artId).exec();

        if(!result){
            throw createHttpError(404, 'Art not found');
        }
        res.status(200).send(result);
    } catch(error){
        next(error)
    }

}

exports.getAll= async(req, res, next)=>{
    try{
        const result =await ArtModel.find().exec();
        res.status(200).send(result);
    }catch(error){
        next(error)
    }
} 

exports.getOne =async(req, res,next)=>{
    const Id=req.params.id;
    try{
        if(!mongoose.isValidObjectId(Id)){
            throw createHttpError(400, "Invalid Id")
        }

        const result = await ArtModel.findById(Id).exec();

        if(!result){
            throw createHttpError(404, "Art not found");

        }
        res.status(200).send(result);
    }catch(error){
        next(error)
    }
}

exports.search = async(req,res, next)=>{
    const query=req.query.q;
    try{
        if(!query){
            throw createHttpError(400, "Please provide a search query")
        
        }

        const result = await ArtModel.find({name:{$regex:query, $options:'i'}}).exec();
         if(!result){
            throw createHttpError(404, 'Art is not found');
         }

         res.status(200).send(result);
    }catch(error){
        next(error)
    }
}