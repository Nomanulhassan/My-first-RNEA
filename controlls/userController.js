
const JWT = require('jsonwebtoken')
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
var { expressjwt: jwt} = require('express-jwt');




const requireSignIn = jwt({
  secret: 'NOMI786HASSANi', algorithms:['HS256']
})


const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "password is required and 6 character long",
      });
    }
    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(500).send({
        success: true,
        message: "User Already Registerd With This Email",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registration is complete please login.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register Api",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide  email or password",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not Found",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        
      return res.status(500).send({
        success: false,
        message: "Invalid username or password",
      });
    }
    const token = await JWT.sign({_id:user._id}, process.env.JWT_SECERT,{
        expiresIn:'30d'
    })
    user.password = undefined
    res.status(200).send({
      success: true,
      message: "login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login Api",
      error,
    });
  }
};


// GET all users or a specific user by ID
const getUsersController = async (req, res) => {
  try {
    const { id, email } = req.query; // extract query params

    if (id) {
      // If id is provided, find user by ID
      const user = await userModel.findById(id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found with the provided ID",
        });
      }
      return res.status(200).send({
        success: true,
        message: "User found",
        data: user,
      });
    } else if (email) {
      // If email is provided, find user by email
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found with the provided email",
        });
      }
      return res.status(200).send({
        success: true,
        message: "User found",
        data: user,
      });
    } else {
      // If neither id nor email, return all users
      const users = await userModel.find();
      return res.status(200).send({
        success: true,
        message: "All users retrieved successfully",
        data: users,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in fetching users",
      error,
    });
  }
};


const updateUserController = async(req,res) => {
  try {
    const {name,password,email} = req.body
    const user = userModel.findOne({email})
    if(password && password.length < 6){
      return res.status(400).send({
        success:false,
        message:"Password is required and should be 6 character long"
      })
    }
    const hashedPassword = password ? await hashPassword(password) : undefined

  const updateUser = await userModel.findOneAndUpdate({email}, {
    name: name || user.name ,
    password: hashedPassword || user.password
  },{new:true});
  updateUser.password = undefined;
 res.status(200).send({
  success:true,
  message:"Profile Updated Please Login",
  updateUser,
 })
  } catch (error) {
    console.log(error)
    res.status(500).send ({
      success:false,
      message:"Error In User Update Api",
      error,

    })
  }
};

module.exports = { getUsersController, registerController , loginController, updateUserController, requireSignIn};
