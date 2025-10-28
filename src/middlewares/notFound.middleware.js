import createHttpError from "http-errors"

export default (req, res, next)=>{
    // res.status(404).json({ msg: 'Not Found'})
    return next( createHttpError.NotFound())
}