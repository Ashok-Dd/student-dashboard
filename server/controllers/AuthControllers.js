import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Student } from '../models/StudentModel.js';
import axios from 'axios'
export const Login = async(req , res) => {
    try {
        const {email , password} = req.body ;
        if(!email || !password ){
            return res.status(400).json({success : false , message : "All feilds are required ..."})
        }
        const user = await Student.findOne({email});
        if(!user){
            return res.status(400).json({success : false , message : "Email doesn't exists..!"})
        }
        const isPasswordMatched = await bcrypt.compare(password , user.password);
            if(!isPasswordMatched){
                return res.status(400).json({success : false , message : "Password Incorrect..."})
            }
            const token = jwt.sign({userId : user._id} , process.env.JWT_SECRET , {expiresIn: '24h'})
            res.cookie('authToken' , token , {
                sameSite: 'strict',
                httponly: true ,
                maxAge : 24 * 60 * 60 * 1000 ,
                secure : process.env.NODE_ENV === "production"
            })
            return res.status(200).json({
                message : "Login Sucessfull ..." ,
                success : true ,
                user : {
                    ...user._doc , password : undefined
                }
            })
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : 'Internal server error'})
    }
}

export const Register = async (req , res) => {
    try {        
        const {studentId , name , email , password , gender , year} = req.body
        if (!name || !email || !password || !studentId || !gender || !year) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const EmailIsExist = await Student.findOne({email});
        if(EmailIsExist){
            return res.status(400).json({message : "Email already Exists.."})
        }
        const hashedPassword  = await bcrypt.hash(password , 10 )
        const user = await Student.create({
            studentId ,name , email , password : hashedPassword , gender , year
        })
        const token = jwt.sign({userId : user._id} , process.env.JWT_SECRET  , {expiresIn : '24h'})
        res.cookie("authToken" , token , {
            httponly : true ,
            sameSite : 'strict' ,
            maxAge : 24 * 60 * 60 * 1000 ,
            secure : process.env.NODE_ENV === 'production'
        })

        return res.status(200).json({
            success : true ,
            message : "User created Sucessfully ..." , 
            user : {
                ...user._doc ,
                password : undefined
            }
        })

    } catch (error) {
        console.log("Register : " + error)
        return res.status(400).json({message : "Internal server issue ." , error})
    }
}

export const checkAuth = async(req , res) => {
    try {        
        let user = await Student.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({message : "Email doesn't exist ..."})
        }
        return res.status(200).json({user})
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error : 'Internal server error'})
    }
}

export const logout = async(req , res) => {
    try {
        res.clearCookie("authToken" , {
            httponly: true ,
            sameSite:"strict",
            secure : process.env.NODE_ENV === "production" ,
        })
        return res.status(200).json({
            success : true ,
            message : "Logout sucessful"
        })
    } catch (error) {
        return res.status(400).json({message : "Internal server issue ..."}) ;
    }
}

export const isPasswordValid = async(req , res) => {
    try {
        const {email , password} = req.body;
        if (!password) {
            return res.status(200).json({success : false , message : "Please enter your password !"})
        }
        const user = await Student.findOne({email})
        const isPasswordMatched = await bcrypt.compare(password , user.password);
        if(!isPasswordMatched) {
            return res.status(200).json({success : false , message : "Wrong password"});
        }
        else {
            return res.status(200).json({success : true , message : "Valid password"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success : false , message : "Internal server issue .."})
    }
}

export const getLeetcodeProfile = async (req, res) => {
  const { username } = req.body;

  const query = {
    query: `
      query getUserAndTotalProblems($username: String!) {
        matchedUser(username: $username) {
          profile {
            ranking
            userAvatar
          }
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
        }
        allQuestionsCount {
          difficulty
          count
        }
      }
    `,
    variables: { username }
  };

  try {
    const response = await axios.post("https://leetcode.com/graphql", query, {
      headers: { "Content-Type": "application/json" },
    });

    const { matchedUser, allQuestionsCount } = response.data.data;

    if (!matchedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { profile, submitStatsGlobal } = matchedUser;
    const solved = submitStatsGlobal.acSubmissionNum;

    const formatStats = (difficulty) => {
      return {
        solved: solved.find(x => x.difficulty === difficulty)?.count || 0,
        total: allQuestionsCount.find(x => x.difficulty === difficulty)?.count || 0,
      };
    };

    const result = {
      username,
      rank: profile.ranking,
      avatar: profile.userAvatar,
      easy: formatStats("Easy"),
      medium: formatStats("Medium"),
      hard: formatStats("Hard"),
    };

    
    return res.json(result);

  } catch (error) {
    console.error("LeetCode fetch failed:", error.message);
    return res.status(500).json({ error: "LeetCode fetch failed" });
  }
};



