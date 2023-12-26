// This file is used to handle apierror in standard way documentation- nodejs api error

class Apierror extends Error{
    constructor(
        statusCode,
        message="Something went wrong",
        errors=[],
        statck=""
    ){
        super(message)
        this.message=message,
        this.statusCode=statusCode,
        this.data=null
        this.success=false;
        this.errors=errors

if(statck){
    this.stack=statck
}else{
    Error.captureStackTrace(this,this.constructor)
}

    }
}



export {Apierror}