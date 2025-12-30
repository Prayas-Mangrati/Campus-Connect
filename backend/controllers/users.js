const User=require("../models/User");
const ExpressError=require("../utils/ExpressError");
const Registration=require("../models/Registration");

module.exports.registerUser=async (req,res,next)=>{
    try{
        const {username,email,password}=req.body;
        const user=new User({username,email});
        const registeredUser=await User.register(user,password);

        res.status(201).json({
            message:"User registered successfuly",
            user:registeredUser.username,
        });
    }catch(err){
        next(err);
    }
};

module.exports.loginUser=(req,res)=>{
    res.json({
        message:"Logged in successfully",
        user:req.user.username,
    });
};

module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      return res.status(201).json(registeredUser); // 🔥 THIS LINE IS REQUIRED
    });
  } catch (err) {
  if (err.code === 11000) {
    return res.status(400).json({
      error: "Username or email already exists",
    });
  }
  next(err);
}

};


module.exports.getMyRegistrations=async(req,res,next)=>{
    try{
        const registrations=await Registration.find({
            user:req.user._id
        }).populate("event");
        res.json(registrations);
    }catch(err){
        next(err);
    }
};
module.exports.getMyRegisteredEvents = async (req, res, next) => {
  try {
    const registrations = await Registration.find({
      user: req.user._id,
    }).populate("event");

    const events = registrations
      .filter(reg => reg.event)
      .map(reg => reg.event);

    res.json(events);
  } catch (err) {
    next(err);
  }
};
