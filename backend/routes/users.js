const express=require("express");
const router=express.Router();
const userController=require("../controllers/users");
const passport=require("passport");
const {isLoggedIn}=require("../middlewares/validateEvent");

//router.post("/register",userController.registerUser);

router.post(
    "/login",
    passport.authenticate("local"),
    userController.loginUser
);
router.post("/signup", userController.signup);

router.post("/logout",(req,res,next)=>{
    req.logout(err=>{
        if(err){
            return next(err);
        }
        res.json({message:"Logged out successfully"});
    });
});
router.get(
    "/me/registrations",
    isLoggedIn,
    userController.getMyRegistrations
);
router.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json(null);
  res.json(req.user);
});

router.get("/me/registered-events", isLoggedIn, userController.getMyRegisteredEvents);



module.exports=router;