import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateTokenAccess } from '../libs/jsonwebtoken.js'
import jwt from 'jsonwebtoken'
import { sendEmailVerification } from '../services/mailing.js'

export const registerUser = async (req, res) => {
  const { name, surname, email, password } = req.body
  console.log(req.body, '<<---- from registerUser controller')
  try {
    const userFound = await User.findOne({ email: email })
    if (userFound) {
      return res.status(400).send('User already exists')
    }
    const salt = await bcrypt.hash(password, 10)
    const user = new User({ name, surname, email, password: salt })
    const newUser = await user.save()
    const tokenAccess = await user.generateTokenAccess({ _id: newUser._id })

    // Enviar correo de verificacion de email --> api gmail
    sendEmailVerification(email, tokenAccess)
    res.status(200).json(newUser).redirect('/check-email')
  } catch (error) {
    console.error(error, '<--- ERROR')
  }
}

export const verifyUser = async (req, res) => {
  try {
    const decodToken = await jwt.verify(
      req.params.token,
      process.env.SECRET_KEY
    )
    console.log(decodToken, '<--- decodToken')
    if (!decodToken || !decodToken.user._id) {
      return res.status(400).send('Token is invalid').redirect('/register')
    }
    const userFound = await User.findByIdAndUpdate(
      { _id: decodToken.user._id },
      { status: true }
    )
    if (!userFound) {
      return res.status(400).send('User not found').redirect('/register')
    }

    res.status(200).json(userFound)
  } catch (error) {
    console.error(error, '<--- ERROR')
  }
}

export const logInUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const userFound = await User.findOne({ email })
    if (!userFound) {
      return res.status(400).send('User not found')
    }
    const isMatch = await bcrypt.compare(password, userFound.password)
    if (!isMatch) {
      return res.status(400).send('Invalid credentials')
    }
    if (!userFound.status) {
      return res.status(400).send('User not verified')
    }
    const tokenAccess = await generateTokenAccess({ _id: userFound._id })
    res.cookie('token', tokenAccess)
    res.json(userFound)
  } catch (error) {
    console.error(error, '<--- ERROR')
  }
}

export const logOutUser = async (req, res) => {
  const { _id } = req.body
  try {
    const userFound = await User.findByIdAndUpdate(
      { _id },
      { isOnline: 'offline' }
    )
    console.log(userFound, '<--- userFound')
    res.clearCookie('token')
    res.status(200).json({ msg: 'User logged out' })
  } catch (error) {
    console.error(error, '<--- ERROR')
  }
}

export const editProfileUser = async (req, res) => {
  const { _id, password, role, avatar, isOnline } = req.body

  try {
    const userUpdate = await User.findByIdAndUpdate(
      { _id },
      { password, role, avatar, isOnline },
      { new: true }
    )
    if (!userUpdate) {
      console.log(userUpdate, '<--- userUpdate from editProfileUser controller')
      return res.status(400).send('User not found')
    }
    res.status(200).json(userUpdate)
  } catch (error) {
    console.error(error, '<--- ERROR')
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    console.error(error, '<--- ERROR')
  }
}
