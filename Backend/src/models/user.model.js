import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();



const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    }
});

 

userSchema.methods.isPasswordCorrect = async function(password){
    console.log(this.password)
    return await bcrypt.compare(password, this.password)
}

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();

//     try {   
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (err) {
//         next(err);
//     }

// }); 

 const User = mongoose.model('User', userSchema);
export default User;

