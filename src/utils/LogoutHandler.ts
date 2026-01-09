import axios from "axios";

export async function LogoutHandler() {
   return await axios.get("http://localhost:3000/api/users/logout")
    
}