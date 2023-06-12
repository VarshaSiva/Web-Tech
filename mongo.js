const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice",{ useNewUrlParser: true,
useUnifiedTopology: true, family: 4
})
.then(()=>{
console.log('mongoose connected');
})
.catch((e)=>{
console.log('failed');
})
const logInSchema=new mongoose.Schema({ name:{
type:String, required:true
},
rollnumber:{
type:String, required:true
},
dob:{
type:String, required:true
},
std:{
type:String, required:true
},
email:{
type:String, required:true
},
phonenumber:{
type:String, required:true
},
password:{
type:String, required:true
},
confirmpassword:{ type:String, required:true
}

})
const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection
