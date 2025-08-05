import { asyncHandler } from "../utils/asyncHandler.js";    
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const createUser = asyncHandler(async (req , res,next)=>{
    const { userName, password } = req?.body;

    if (!userName || !password) {
        throw new ApiError( 400,"All fields are required");
    }

    const user = await User.create({ userName, password });
    if (!user) {
        throw new ApiError(  500,"Failed to create user");
    }   
    res.status(201).json(new ApiResponse({
        message: "User created successfully",
        data: {
            user: {
                id: user._id,
                name: user.userName,
              
            }
        }
    }));
});

const login = asyncHandler(async(req, res ,next)=>{
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError("All fields are required", 400);
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        throw new ApiError( 401,"Invalid email or password");
    }
 
    res.status(200).json(new ApiResponse({
        message: "Login successful",
        data: {
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        }
    })
    );
})


export{ createUser, login };