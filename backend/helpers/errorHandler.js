module.exports = errorHandling = (err, req, res, next)=>{
    res.status(500).json({ErrorName:err.name, ErrorMessage:err.message, ErrorStatus:err.status});
}