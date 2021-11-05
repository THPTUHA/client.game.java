import UserProvider from "../context/UserProvider";
import Login from "./authorization/Login";
import Nav from "./pages/Nav";

export default function Main(){
   
    return (
        <UserProvider>
            <Nav/>
        </UserProvider>
    )
}