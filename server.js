// const config=require('./config/mongodb')
const express=require('express');
const mongoose=require('mongoose')
const app=express();
const router=require('./routes/userRoutes')
const AdminRouter=require('./routes/adminRoutes')

const cors = require('cors')
app.use(express.json())

const corsOptions={
    origin :'http://localhost:3000',
    optionsSuccessStatus :200
};
app.use(cors(corsOptions)) ;

mongoose.connect("mongodb://127.0.0.1:27017/WisdomTest")
const connection =mongoose.connection;
connection.on('connected', ()=>{
    console.log("Connected To DataBase----->");
})
connection.on('error', ()=>{
    console.log("Not Connected To Dats Base", error);
})

app.use(express.json())
app.use('/api/user', router)
app.use('/api/admin', AdminRouter)

app.listen(3002, ()=>{
    console.log("Connected to Port 3002")
})