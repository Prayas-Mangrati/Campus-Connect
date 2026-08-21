const mongoose=require("mongoose");

const eventSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
    },
    location:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
    },
    time:{
        type:String,
    },
    banner:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    status:{
        type:String,
        enum:["Active","Cancelled"],
        default:"Active",
    }
});
const Event=mongoose.model("Event",eventSchema);
module.exports=Event;