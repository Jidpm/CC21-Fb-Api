import createHttpError from 'http-errors'
import  jwt  from 'jsonwebtoken'
import { getUserBy } from '../services/user.service.js'


export default async (req, res, next) => {
    const authorization = req.headers.authorization
    // console.log(authorization)
    if(!authorization || !authorization.startsWith('Bearer ')){
        // return next(createHttpError[401]('Unauthorized'))
        throw createHttpError[401]('Unauthorized')
    }
    const token = authorization.split(' ')[1]
    console.log(token)
    if(!token){
        throw createHttpError[401]('Unauthorized')
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    console.log(payload)
    
    const foundUser = await getUserBy('id', payload.id)
    if(!foundUser){
        throw createHttpError[401]('Unauthorized')
    }
    const {password, createdAt, updatedAt, ...userData} = foundUser
    req.user = userData

    next()
}