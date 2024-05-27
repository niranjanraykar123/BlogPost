if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

//Integrating required dependencies
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const session=require("express-session")
const MongoStore=require("connect-mongo")
const path=require("path");
const methodOverride=require('method-override');
engine = require('ejs-mate');
app.engine('ejs', engine);
let Expresserror=require("./utils/Expresserror.js")
let {listingschema,reviewschema}=require("./schemajoi.js");
const passport=require("passport");
const LocalStrategy= require("passport-local");
const User=require("./models/user.js");

const flash=require("connect-flash");

//Integrating routers 
const listingroutes=require("./routers/listing.js")
const reviewroutes= require("./routers/review.js");
const userroutes=require("./routers/user.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
//Implementing sessions to store session info in temp database
const dburl=process.env.ATLASDB_URL;
const store = MongoStore.create({
    mongoUrl :dburl,
    crypto : {
        secret : "mysupersecretcode"
    },
    touchAfter : 24 * 3600,
})
store.on("error",()=>{
    console.log("error in mongo session store",err);
})

const sessionOptions={
    store,
    secret:"mysuperseretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true
    }
}
app.use(session(sessionOptions));
//using flash for flashing one time message 
app.use(flash());
//using passport library for documentation
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Making connection with mongo-atlas

main()
.then(()=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(dburl)
}

app.listen(8080,()=>{
    console.log("Listning on port 8080");
})

app.get("/",(req,res)=>{
    res.redirect("/listings")
})
//Using locals property to integrate messages in ejs files
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})
//})
//Integrating routes to add routing for all three models
app.use("/listings",listingroutes)
app.use("/listings/:id/reviews",reviewroutes)
app.use("/",userroutes);

//Code to handle errors using customized error handling middlewares
app.all("*",(req,res,next)=>{
    next(new Expresserror(404,"Page not found"));
    })
    
    app.use((err,req,res,next)=>{
    let{status=500,message="Some wrong"}=err;
    res.status(status).render("error.ejs",{message});
    })



