import {Router} from 'express';
const userRoute = Router();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

userRoute.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const { name, email, password } = user;

    const isEmailAlreadyExist = await UserRepository.findOne({ email });

    if (isEmailAlreadyExist) {
      return res.status(400).json({
        status: 400,
        message: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserRepository.create({ name, email, password: hashedPassword });

    res.status(201).json({
      status: 201,
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});

userRoute.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserRepository.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "User not found",
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Wrong password",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "YOUR_SECRET",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      status: 200,
      success: true,
      message: "Login success",
      token: token,
      user: user
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});


export default userRoute;