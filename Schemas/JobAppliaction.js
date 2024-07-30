const mongoose=require('mongoose');
const JodSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['Pending', 'Accepted', 'Rejected'],
        default:"Pending",
        required:true
    }
    
},{timestamps:true}
)

const Job=mongoose.model('Job', JodSchema);

module.exports=Job;