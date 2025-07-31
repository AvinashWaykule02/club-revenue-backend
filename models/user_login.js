const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,

    },
    email : {
        type : string,
        reqrequire : true,
        unique : true,
        lowercase: true,
    }, 
    password : {
        type : string,
        reqrequire : true,
        minlength : 6,
        select : false,
    },
    role : {
        type : string,
        enum : [admin, member],
        defoult : member,
    }
}, {timestamps:true});

module.exports = mongoose.model('User', userSchema);