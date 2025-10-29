import createHttpError from "http-errors"
import identityKeyUtil from "../utils/identity-key.util.js"
import prisma from "../config/prisma.config.js"
import bcrypt from "bcryptjs"
import { registerSchema } from "../validations/schema.js"

export const register = async (req, res, next)=> {
  const { identity, firstName, lastName, password, confirmPassword } = req.body 
  //validation
  // if(!identity.trim() || !firstName.trim() || !lastName.trim() || !password.trim() || !confirmPassword.trim()){
  //   return next(createHttpError[400],('fill all inputs'))
  // }
  const rs = registerSchema.parse(req.body)
  console.log(rs)


  if(confirmPassword !== password ){
    return next(createHttpError[400],('Pass not right อีโจร!!'))
  }
  // identity เป็น email หรือ mobile phone number
  const identityKey = identityKeyUtil(identity)

  if(!identityKey){
    return next(createHttpError[400]('identity must be email or phone number'))
  }
  // หาว่ามี user นี้แล้วหรือยัง
  const haveUser = await prisma.user.findUnique({
    where: {[identityKey]: identity}
  })
  if(haveUser){
    return next(createHttpError[409]('This user already register'))
  }
  // เตรียมข้อมูล new user + hash password
  const newUser = {
    [identityKey] : identity,
    password : await bcrypt.hash(password, 10),
    firstName: firstName,
    lastName: lastName,
  }

  const result = await prisma.user.create({data: newUser})

  res.json({
    msg: 'Register Successful',
    result: result
  })
}


export const login = (req, res, next)=> {
  // if(req.body.password === '12345'){
  //   return next(createHttpError[400]('wrong password'))
  // }
  res.json({
    msg: 'Login controller',
    body: req.body
  })
}

export const getMe = (req, res)=> {
  res.json({ msg: 'Getme controller'})
}

