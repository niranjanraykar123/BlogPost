const User=require("../models/user");

//Providing signup functionality to user for authentication
module.exports.getsignupForm=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.signup=async(req,res,next)=>{
    try{
    let {username,email,password}=req.body;
    const newuser=new User({email,username});
    const registereduser= await User.register(newuser,password);
    //console.log(registereduser);
    req.login(registereduser,(err)=>{
        console.log("12");
        if(err){ return next(err);}
        req.flash("success","Welcome to Blogpost");
        res.redirect("/listings");
    })
   
    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup")
        
    }
}

//Providing functionality to allow user to login and logout using passport library for authentication
module.exports.getLoginForm=(req,res)=>{
    res.render("users/login.ejs");
}
module.exports.login=async (req,res)=>{
    req.flash("success","Welcome back to BlogPost");
    let redirectUrl=res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
 }
 module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){ return next(err);}
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })

}