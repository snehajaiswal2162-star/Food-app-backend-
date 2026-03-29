const User = require( '../model/user')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


//jwt token
// const generateToken = async (res,payload) => {
//     const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn: '1d'})
//     res.cookie("token",token,{
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production',
//         sameSite: 'lax',
//         maxAge: 24*60*60*1000
//     })
//     return token
    
// }
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
};


//register
 const registerUser = async (req,res) => {
    try {
        const {name,email,password} =  req.body

        if(!name || !email || !password){
            return res.json({message: 'Please fill all the fields.', success: false})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.json({message: 'user already exists', success: false})
        }

        const hassPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password: hassPassword})
        return res.json({message: "User registered successfully", success: true})


    } catch (error) {
        console.log(error.message)
        return res.json({message: 'Internal server error', success: false})
    }
}

//login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Generate JWT
    const token = generateToken({ id: user._id });

    // ✅ Set cookie ONCE
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,        // localhost
      sameSite: "lax",      // dev mode
      maxAge: 24 * 60 * 60 * 1000,
    });

    // ✅ Send response ONCE
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//adminlogin
 const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid credentials",
        success: false
      })
    }

    const adminEmail = process.env.ADMIN_EMAIL
    const adminPassword = process.env.ADMIN_PASSWORD

    if (email !== adminEmail || password !== adminPassword) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false
      })
    }

    const token = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      message: "Admin logged in successfully",
      success: true,
      admin: {
        admin: adminEmail
      },
      token
      
    })

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: "Internal server error",
      success: false
    })
  }
}

//logout
 const logoutUser = (req,res) => {
    try {
        res.clearCookie('token')
        return res.json({message: 'User logout successfully', success: true})
    } catch (error) {
        console.log(error.message)
        return res.json({message: 'Internal server error', success: false})
    }
}

const getProfile = async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    if(!user){
      return res.status(404).json({message: 'user not found', success: false})
    }
    res.json(user)
  } catch (error) {
    return res.send({message: 'Internal server error', success: false})
  }
}

const isAuth = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    return res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    console.error(error);
    return res.status(401).json({
      success: false,
      message: "Not authenticated"
    });
  }
};


module.exports = {
  registerUser,
  loginUser,
  adminLogin,
  logoutUser,
  getProfile, 
  isAuth
}