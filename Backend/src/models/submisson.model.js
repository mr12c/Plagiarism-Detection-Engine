import mongoose from "mongoose";
 


const SubmissonSchema = new mongoose.Schema({
    contestID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contest',
        required: true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    originalCode:{
        type:String,
    },
    tokenizeCode:{
        type:Array,
    },
    hashCode:{
        type:Array,
    },
    astCode:{
        type:String,
    }
})


const Submisson = mongoose.model('Submisson', SubmissonSchema);

export default Submisson;