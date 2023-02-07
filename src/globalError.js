//  Error Pass Class inside next 
export default class AppError extends Error {
    constructor(message , statusCode){
        super(message)
        this.statusCode = statusCode 
        this.message = message
        this.status = false
    }
}

//  Global Error Handling For All Req or Entire Application 

export function globalError(err, req, res, next){
    err.message = err.message || "Internal server Error !"
    err.statusCode = err.statusCode || 500


    
    res.status(err.statusCode).json({
        status : false , message : err.message
    })
}