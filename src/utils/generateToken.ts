import Jwt from "jsonwebtoken"
import {jwtPayload} from "../utils/types"
import {serialize} from "cookie"


//generate token
export function generateJWT(jwtPayload:jwtPayload){
        const token = Jwt.sign(jwtPayload,process.env.JWT_SECRET as string)
        return token
}

//set cookie with JWT
export function setCookie(payload:jwtPayload){
        const token = generateJWT(payload)
        const cookie = serialize("jwtToken" , token , {httpOnly:true , secure:process.env.NODE_ENV == "production" , sameSite:"strict" , path:"/" , maxAge:60*60*24*7})
        return cookie
}

