const mongoose=require("mongoose");
const Schema =mongoose.Schema;

const artSchema =new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    artistName:{
        // type:Schema.Types.ObjectId,
        // ref:'Seller',
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const Art =mongoose.model('Art',artSchema);

module.exports=Art;