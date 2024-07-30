function middleware(req, res, next){
    const token =req.headers['authorization'];
    if(!token){
        res.status(403).send('authorised header missing')
    }else{
        req.token=token;
        next();
    }
}

module.exports=middleware;