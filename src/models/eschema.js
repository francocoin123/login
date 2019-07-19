const mongoose = require("mongoose");
const bcryt = require("bcrypt-nodejs");
const {Schema} = mongoose;

const schemanuevo = new Schema({
    email : String,
    password : String
});
schemanuevo.methods.encryptpassword = (password)=>{
    return bcryt.hashSync(password,bcryt.genSaltSync(10));
};
schemanuevo.methods.desencryptpassword = function(password){
    return bcryt.compareSync(password,this.password);
};

module.exports = mongoose.model("prueva1111",schemanuevo);