import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10); // This method hashes the password and returns a hashed password string./encrypts the password
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();  /**This method call attempts to save the newUser document (typically an instance of a Mongoose model) to the database. */
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    /**above line : JWT token using the user’s ID and the secret key stored in environment variables.
     *  This token is used for authenticating future requests. */
    /**below line : destructive assignement : The password field is excluded from rest, ensuring that sensitive information is not included in the response. */
    const { password: pass, ...rest } = validUser._doc;
     
    res
      .cookie('access_token', token, { httpOnly: true }) //Express.js method to set a cookie in the HTTP response.
      .status(200) //success status
      .json(rest); //response in json format excluding password
  } catch (error) {
    next(error);
  }
};
/**
 * 
 in the google controller, we first check if the user exists in the database. If the user exists, we generate a JWT token and send it back to the client.
 if user does not exist, we generate a random password, hash it, and create a new user with the provided email, name, and photo.
 here , users are signing in with their Google account, so we don’t need to ask them for a password.rather we generate a random password for them for authentication. 
 */
export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
