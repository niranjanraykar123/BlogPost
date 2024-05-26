if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

//console.log(process.env.SECRET);
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const session=require("express-session")
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

const listingroutes=require("./routers/listing.js")
const reviewroutes= require("./routers/review.js");
const userroutes=require("./routers/user.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));
const sessionOptions={
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
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const dburl=process.env.ATLASDB_URL;
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

app.use("/listings",listingroutes)

