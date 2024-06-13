import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import { compareHashPass, hashPassword } from "../utils/authHelper.js";
export const registerController = async (req, res) => {
  const { name, email, password, phone, address, answer, role } = req.body;
  if (!name) {
    return res.send({ message: "Name is Required!" });
  }
  if (!email) {
    return res.send({ message: "Email is Required!" });
  }
  if (!password) {
    return res.send({ message: "Password is Required!" });
  }
  if (!address) {
    return res.send({ message: "Address is Required!" });
  }
  if (!answer) {
    return res.send({ message: "Answer is Required!" });
  }
  if (!phone) {
    return res.send({ message: "Phone is Required!" });
  }
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(200).send({
      success: true,
      message: "A User with this Email already exists",
    });
  }

  const hashedPassword = await hashPassword(password);
  const user = await new userModel({
    name,
    email,
    password: hashedPassword,
    phone,
    address,
    answer,
    role,
  }).save();

  res.status(200).send({
    success: true,
    message: "User Register Successfully...!",
    user,
  });
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    // find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(405).send({
        success: false,
        message: "No such user found in dectionary",
      });
    }

    const match = compareHashPass(password, user.password);
    if (!match) {
      return res.status(418).send({
        success: false,
        message: "Incorrect Password Provided...",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SCRETE);
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
        id:user._id
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(406).send({
      success: false,
      message: "Error while login user..",
      error,
    });
  }
};

export const forgotePasswordController = async (req, res) => {
  try {
    const { email, Newpassword, answer } = req.body;
    if (!email || !Newpassword || !answer) {
      return res.status(403).send({
        success: false,
        message: "Please provide all required fields",
      });
    }

    let checkEmail = await userModel.findOne({ email });
    if (!checkEmail) {
      return res.status(409).send({
        success: false,
        message: "User with this email not registered yet",
      });
    }
    //check answer
    let user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(410).send({
        success: false,
        message: "Your Answer is incorrect please enter correct one",
      });
    }
    let hashedPass = await hashPassword(Newpassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPass });
    return res.status(200).send({
      success: true,
      message: "your password has been changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(411).send({
      success: false,
      message: "there was an error while changing your password",
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    // check password length
    if (password && password.length < 6) {
      return res.json({ error: "password is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    updatedUser.save();
    res.status(200).send({
      success: true,
      message: "Profile is Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "something went wrong while updating profile..!",
    });
  }
};

export const getAllUsersController = async(req,res)=>{
  try {
  const users =  await userModel.find({}).select("-password");
    res.status(200).send({
      success: true,
      message: "user",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      message: "something went wrong while getting user..!",
    });
  }
}