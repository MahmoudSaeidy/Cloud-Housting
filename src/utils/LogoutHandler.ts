import axios from "axios";
import { DOMAIN } from "./constants";

export async function LogoutHandler() {
   return await axios.get(`${DOMAIN}api/users/logout`)
    
}