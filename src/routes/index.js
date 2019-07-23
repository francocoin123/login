const router = require("express").Router();

const passport = require("passport");

router.get("/",(req,res)=>{
    res.render("index")
});
router.post("/",passport.authenticate('form',{
    successRedirect: "/entrar",
    failureRedirect: "/",
    passReqToCallback: true
})); 

router.get("/entrar",(req,res)=>{
    res.render("entrada")
})
router.post("/entrar",passport.authenticate("form2",{
    successRedirect: "/profile",
    failureRedirect: "/entrar",
    passReqToCallback: true
}));

router.get("/profile",isAuthenticated,(req,res,next)=>{
    res.render("profile")
});
router.get("/prueva",isAuthenticated,(req,res)=>{
    res.render("prueva")
})
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});
function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        
        return next();
    }
    res.redirect("/");
};
module.exports = router;
