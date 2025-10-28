import { Router } from "express";


const authRoute = Router()

authRoute.post('/register',(req, res)=>{
    res.send('Register Route')
})

authRoute.post('/login',(req, res)=>{
    res.json({
        msg: 'Login Route',
        body: req.body
    })
})

authRoute.get('/me',(req, res)=> {res.send('Get me Route')})

export default authRoute
