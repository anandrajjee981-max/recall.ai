import usermodel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
//this is a 

export async function register(req,res){
try{
const {username , email , password}= req.body
const check = await usermodel.findOne({email})
if(check){
    return res.status(404).json({
        message :"unauthorised access"
    })
}
const hash = await bcrypt.hash(password,10)
const user = await usermodel.create({
    username,
    email,
    password: hash
})
const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn: "1d"})

res.cookie('token', token, {
    httpOnly: true,    
    secure: true,     
    sameSite: 'none',  
    maxAge: 24 * 60 * 60 * 1000 
});

return res.status(201).json({
    message : "user registered successfully"
})

}
catch(err){
    throw err 
    res.status(500).json({
        message : "internal server error"
    })
}



}

export async function login(req, res) {
    try {
        const { email, password } = req.body;

  
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

   
        const user = await usermodel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

      
        res.cookie('token', token, {
            httpOnly: true,    
            secure: true,     
            sameSite: 'none',  
            maxAge: 24 * 60 * 60 * 1000 
        });

      
        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
export async function getme(req,res){
    try{
const user = req.user 
res.status(200).json({
    message : "user getme",
    user 
})


    }
    catch(err){
    throw err 
    res.status(500).json({
        message : "internal server error"
    })
    }
}








