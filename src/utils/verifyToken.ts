import jwt from "jsonwebtoken"
import { NextRequest } from "next/server"
import { jwtPayload } from "../utils/types"



//Verify Token For API End Point
export function verifyToken (request:NextRequest):jwtPayload | null{
    try{
        const jwtcookie = request.cookies.get("jwtToken")
        const token = jwtcookie?.value as string
        if(!token){
            return null
        }
        else{
            const privateKey = process.env.JWT_SECRET as string
            const userPayload = jwt.verify(token , privateKey) as jwtPayload
            return userPayload
        }
    }
    catch(error){
        return null
    }

}


//Verify Token For Page
export function verifyTokenForPage (token:string):jwtPayload | null{
    try{
        if(!token){
            return null
        }
        else{
            const privateKey = process.env.JWT_SECRET as string
            const userPayload = jwt.verify(token , privateKey) as jwtPayload
            return userPayload
        }
    }
    catch(error){
        return null
    }

}