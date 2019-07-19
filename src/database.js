const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/proyecto1",{useNewUrlParser: true})
    .then(db=>{console.log("database is connect")})
    .catch(err=>{console.log(err)})