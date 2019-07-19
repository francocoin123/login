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
router.get("/profile",(req,res)=>{
    res.render("profile")
});
router.get("/entrar",(req,res)=>{
    res.render("entrada")
})
router.post("/entrar",passport.authenticate("form2",{
    successRedirect: "/profile",
    failureRedirect: "/entrar",
    passReqToCallback: true
}));
module.exports = router;
