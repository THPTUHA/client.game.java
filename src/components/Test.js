import axios from "axios";

const Test=()=>{
    const data={id_game:5};
    const submit=()=>{
        try{
            const res= axios.post("/play_public",data);
            console.log(res.data);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <button onClick={submit}>OK</button>
    )
}
export  default Test;