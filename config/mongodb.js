const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/WisdomTest")
const connection =mongoose.connection;
connection.on('connected', ()=>{
    console.log("Connected To DataBase----->");
})
connection.on('error', ()=>{
    console.log("Not Connected To Dats Base", error);
})

module.exports=connect;