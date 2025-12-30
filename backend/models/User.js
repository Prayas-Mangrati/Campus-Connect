const mongoose=require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
});

//this line adds username, hash, salt and auth methods
// passport handles hashing
//Givues us methods like User.register() and user.authenticate()
userSchema.plugin(passportLocalMongoose);



module.exports=mongoose.model("User",userSchema);