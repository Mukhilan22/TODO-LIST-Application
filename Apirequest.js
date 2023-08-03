const apiRequest = async (url ='', optionsObj=null,errMsg=null)=>{ //default values given
    try{
        const response = await fetch(url,optionsObj)
        if(!response.ok) throw Error("Please Reload APP")
    }catch(err){
        errMsg=err.Message;
    }finally{
        return errMsg
    }
}
export default apiRequest
