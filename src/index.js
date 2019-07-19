 const express = require("express");
 const morgan = require("morgan");
 const path = require("path");
 const engine = require("ejs-mate");
 const passport = require("passport");
 const session = require("express-session");
 const flash = require("connect-flash");

 //inicializadores
 const app = express();
 require("./database");
 require("./passport/index");

 //setings
 app.set("port",process.env.PORT || 3000)
 app.set("views",path.join(__dirname,"views"));
 app.engine("ejs",engine);
 app.set("view engine","ejs"); 

 //midlewere
 app.use(morgan("dev"));
 app.use(express.urlencoded({extended:false}));
 app.use(session({
     secret: "francose",
     resave: false,
     saveUninitialized: false
 }));
 app.use(flash());
 app.use(passport.initialize());
 app.use(passport.session());
 app.use((req,res,next)=>{
     app.locals.singupmensage = req.flash("singupmensage");
     app.locals.singentrada = req.flash("messageentrada");
     next();
 });
 //routes
 app.use("/",require("./routes/index"));

 //inicializar server
 app.listen(app.get("port"),()=>{
     console.log("server on port",app.get("port"));
 });