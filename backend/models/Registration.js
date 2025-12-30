const mongoose = require("mongoose");
const registrationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
    },
    {timestamps:true}//adds fields createdAt and updatedAt to schema/ automatically stores when a document was created and last updated.
);
registrationSchema.index(
    {user:1, event:1},
    {unique:true}
);
module.exports=mongoose.model("Registration",registrationSchema);
