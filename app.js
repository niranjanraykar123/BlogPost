const express=require("express");
const app=express();
if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require('method-override');
engine = require('ejs-mate');
app.engine('ejs', engine);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));

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

