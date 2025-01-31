export default function SendResponse(res,status,err,data,msg){
res.status(status).json({
    err,
    message : msg,
     data,
})

}

