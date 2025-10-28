

export const register = (req, res)=> {
  res.send('Register controller')  
}

export const login = (req, res)=> {
  res.json({
    msg: 'Login controller',
    body: req.body
  })
}

export const getMe = (req, res)=> {
  res.json({ msg: 'Getme controller'})
}