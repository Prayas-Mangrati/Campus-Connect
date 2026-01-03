const ExpressError=require("../utils/ExpressError");
const Joi=require("joi");
const Event=require("../models/Event");

//CREATE validation (POST)
const createEventSchema=Joi.object({
    title: Joi.string().required(),
    description:Joi.string().allow(""),
    location:Joi.string().required(),
    date:Joi.date(),
});

//UPDATE validation (PATCH)
const updateEventSchema=Joi.object({
    title: Joi.string(),
    description:Joi.string().allow(""),
    location:Joi.string(),
    date:Joi.date(),
}).min(1);//atleast one field must be present

module.exports.validateCreateEvent=(req,res,next)=>{
    const {error}=createEventSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error.details[0].message);
    }
    next();
};

module.exports.validateUpdateEvent=(req,res,next)=>{
    const {error}=updateEventSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error.details[0].message);
    }
    next();
};
module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        return res.status(401).json({error:"You must be logged in"});
    }
    next();
};

module.exports.isEventOwner=async(req,res,next)=>{
    const {id}=req.params;
    const event=await Event.findById(id);
    if(!event){
        throw new ExpressError(404,"Event not found");
    }
    if(!event.owner.equals(req.user._id)){
        return res.status(403).json({error:"You do not have permission"})
    }
    next();
};