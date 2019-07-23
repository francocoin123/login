const passport = require("passport");
const newstrategy = require("passport-local").Strategy;

const eschema = require("../models/eschema");

passport.serializeUser((newschema,done)=>{
    done(null,newschema.id);
});
passport.deserializeUser(async(id,done)=>{
   const newschema = await eschema.findById(id);
   done(null,newschema);
});

passport.use("form",new newstrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},async(req,email,password,done)=>{
    const emailenc =  await eschema.findOne({email:email});
    if (emailenc){
        return done(null,false,req.flash("singupmensage","the email is alredy take"));
    }
    else{
        const newshema = new eschema();
        newshema.email = email;
        newshema.password = newshema.encryptpassword(password);
        await newshema.save();
        done(null,newshema);
    }
   
}));
passport.use("form2",new newstrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
},async(req,email,password,done)=>{
    const emailsin = await eschema.findOne({email:email});
    if (!emailsin ){
        return done(null,false,req.flash("messageentrada","the user not exist"));
    }
    /*if(emailsin = 0){
        return done(null,false,req.flash("messageentrada","insert a email pliss"))
    }*/
    if(!emailsin.desencryptpassword(password)){
        return done(null,false,req.flash("messageentrada","the password is not correct"))
    }
    done(null,emailsin);

}));