import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
 
import { ApiResponse } from "../utils/ApiResponse.js";
import esprima from "esprima";

import Submission from "../models/submisson.model.js";
import User from "../models/user.model.js";


function preprocess(code) {
  return code
    .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // remove comments
    .replace(/\s+/g, ' ')                    // normalize whitespace
    .trim();                                 // trim extra space
}

function tokenize(code) {
  return code.match(/\w+|[^\s\w]/g) || [];
}

function rollingHashes(tokens, windowSize = 10, base = 257, mod = 1e9 + 7) {
  const hashes = [];
  if (tokens.length < windowSize) return hashes;

  let hash = 0, power = 1;

  for (let i = 0; i < windowSize; i++) {
    hash = (hash * base + tokens[i].charCodeAt(0)) % mod;
    if (i < windowSize - 1) power = (power * base) % mod;
  }
  hashes.push(hash);

  for (let i = windowSize; i < tokens.length; i++) {
    hash = ((hash - tokens[i - windowSize].charCodeAt(0) * power % mod + mod) * base + tokens[i].charCodeAt(0)) % mod;
    hashes.push(hash);
  }

  return hashes;
}

function normalizeAST(ast){
  function traverse(node) {
    if (!node || typeof node !== 'object') return;

    if (node.type === 'Identifier') node.name = 'VAR';
    if (node.type === 'Literal') node.value = 'VAL';

    for (let key in node) {
      if (typeof node[key] === 'object') traverse(node[key]);
    }
  }

  const copy = JSON.parse(JSON.stringify(ast));
  traverse(copy);
  return copy;
}

function compareHashes(hashesA, hashesB) {
  const setA = new Set(hashesA);
  let match = 0;
  for (let h of hashesB) {
    if (setA.has(h)) match++;
  }
  return (match / Math.max(hashesA.length, hashesB.length)) * 100;
}

function compareAST(astA, astB) {
  const strA = JSON.stringify(astA);
  const strB = JSON.stringify(astB);

  let match = 0;
  const minLength = Math.min(strA.length, strB.length);
  for (let i = 0; i < minLength; i++) {
    if (strA[i] === strB[i]) match++;
  }

  return (match / Math.max(strA.length, strB.length)) * 100;
}
const createSubmission = asyncHandler(async (req, res, next) => {
     const {userID,contestID,originalCode}=req.body;
    if (!userID || !contestID || !originalCode) {
        throw new ApiError(  400, "All fields are required");
    }
    const preprocessedCode = preprocess(originalCode);
    const tokens = tokenize(preprocessedCode);
    const rollingHashValues = rollingHashes(tokens);
    const normalizedAST = normalizeAST(esprima.parseScript(preprocessedCode));

    const submission = await Submission.create({
        userID,
        contestID,
        originalCode,
        tokenizeCode: tokens,
        hashCode: rollingHashValues,
        astCode: normalizedAST
    });
    if (!submission) {
        throw new ApiError(  500 ,"Failed to create submission");
    }
    // find best matching from existing submissions
    const existingSubmissions = await Submission.find(
        { contestID, userID: { $ne: userID } },
        { hashCode: 1, astCode: 1 ,originalCode:1,userID:1,_id:1,astCode:1}
    )

    let bestMatch = null;
    let bestMatchScore =0;
    for(let sub of existingSubmissions) {
        const hashScore = compareHashes(rollingHashValues, sub.hashCode);
        const astScore = compareAST(normalizedAST, sub.astCode);
 
         const finalScore = 0.4 * hashScore + 0.6 * astScore;

  if (finalScore >  bestMatchScore) {
    bestMatchScore = finalScore;
    bestMatch = sub;
  }
    }

    // find the user with best match
    let bestMatchUser = null;
    if (bestMatch) {
        bestMatchUser = await User.find
        ({ _id: bestMatch.userID }, { name: 1, email: 1 });
    }
    if(bestMatchUser){
        return res.status(201).json(new ApiResponse({
            message: "Submission created successfully",
            data: {
                submission: {
                    id: submission._id,
                    userID: submission.userID,
                    contestID: submission.contestID,
                    originalCode: submission.originalCode,
                    tokenizeCode: submission.tokenizeCode,
                    hashCode: submission.hashCode,
                    astCode: submission.astCode
                },
                bestMatchWith:{
                    ...bestMatchUser,originalCode: bestMatch.originalCode,
                }
            }
        }));
    }

    return res.status(201).json(new ApiResponse({
        message: "Submission created successfully",
        data: {
            submission: {
                id: submission._id,
                userID: submission.userID,
                contestID: submission.contestID,
                originalCode: submission.originalCode,
                tokenizeCode: submission.tokenizeCode,
                hashCode: submission.hashCode,
                astCode: submission.astCode
            },
            bestMatchWith: null
        }
    }));
});

export { createSubmission };