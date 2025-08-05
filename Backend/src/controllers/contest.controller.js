import { asyncHandler } from "../utils/asyncHandler.js";    
import { ApiError } from "../utils/ApiError.js";
import Contest from "../models/contest.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const createContest = asyncHandler(async (req, res, next) => {
    const {title , problemStatement} = req.body;
    if (!title || !problemStatement) {
        throw new ApiError(400, "All fields are required");
    }
    const contest = await Contest.create({ title, problemStatement });
    res.status(201).json(new ApiResponse({
        message: "Contest created successfully",
        data: {
            contest: {
                id: contest._id,
                title: contest.title,
                problemStatement: contest.problemStatement
            }
        }
    }));
});

export { createContest };
