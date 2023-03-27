export const obtainToken = req => {
  const header = req.headers;

  const token = header['authorization'].split(" ")[1]

  if(token !== undefined){
      return token
  }else{
      return{
          status: "error",
          message: "Token not found"
      }
  }
}