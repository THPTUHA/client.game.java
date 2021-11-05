export function authorization(res){
    let token=JSON.parse(localStorage.getItem("user"));
    if(token)
    return { headers: {Authorization: `${token.tokenType} ${token.accessToken}`},...res}
    return "NO";
}