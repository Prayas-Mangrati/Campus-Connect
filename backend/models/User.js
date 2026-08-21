const mongoose=require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    registrationNumber:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    department:{
        type:String,
        required:true,
        trim:true,
    },
    year:{
        type:Number,
        required:true,
    }
});

//this line adds username, hash, salt and auth methods
// passport handles hashing
//Givues us methods like User.register() and user.authenticate()
userSchema.plugin(passportLocalMongoose);



module.exports=mongoose.model("User",userSchema);