const Registration=require("../models/Registration");
const Event=require("../models/Event");

module.exports.cleanupOrphanRegistrations=async()=>{
    const registrations=await Registration.find({});
    for(let reg of registrations){
        const eventExists=await Event.exists({_id:reg.event});
        if(!eventExists){
            await Registration.findByIdAndDelete(reg._id);
        }
    }
};