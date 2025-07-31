const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true, 
    },
    spent : {
        type:Number,
        defoult : 0,

    },
    discription : {
        type : String,
        require : true, 
    },

    manageBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User", // user admin 
    }
}, { timestamps:true});

module.exports = mongoose.model('Event', eventSchema);