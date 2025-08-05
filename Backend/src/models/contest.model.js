import mongoose from 
"mongoose";

const contestSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    problemStatement:{
        type: String,
        required: true
    }
})


const Contest = mongoose.model('Contest',contestSchema);
export default Contest;
