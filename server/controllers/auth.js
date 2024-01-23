import bcrypt from "bcrypt"; /* allows us to encrypt pw */
import jwt from "jsonwebtoken"; /* allows us to create a token */
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        major
      } = req.body;
      
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);

      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        picturePath,
        friends,
        location,
        major,
        viewedProfile: Math.floor(Math.random() * 10000),
        impressions: Math.floor(Math.random() * 10000)
      });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch(err) {
      res.status(500).json({ error: err.message });
    }
}