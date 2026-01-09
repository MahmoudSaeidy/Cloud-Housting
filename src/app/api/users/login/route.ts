import { loginUserDto } from "@/src/utils/dto";
import { loginUserSchema } from "@/src/utils/validationSchemas";
import { NextRequest , NextResponse } from "next/server";
import {prisma} from "../../../../../lib/prisma"
import bcrypt from "bcryptjs";
import {jwtPayload} from "../../../../utils/types"
import { setCookie } from "../../../../utils/generateToken";



/**
 * @method POST
 * @route ~/api/user/login
 * @desc  Login user
 * @access Public
 */

export async function POST (request:NextRequest){
    try{
        const body = (await request.json()) as loginUserDto
        const validation = loginUserSchema.safeParse(body)
        if(!validation.success){
            return NextResponse.json({message:validation.error.issues[0].message},{status:400})
        }

        const user = await prisma.user.findUnique({where : {email : body.email}})
        if (!user){
            return NextResponse.json({message : "Please Register , you do not have an account "},
                {status:400}
            )
        }

       const isPasswordMatch = await bcrypt.compare(body.password , user.password)

        if(!isPasswordMatch){
            return NextResponse.json({message : "Invalid Password"},{status:400})
        }
        const jwtPayload:jwtPayload = {
            id:user.id,
            username :user.username,
            isAdmin : user.isAdmin
        }
        
        const cookie = setCookie(jwtPayload)
       

        return NextResponse.json({messsage:"Login Succssfuly"} , {status:200 , headers :{"Set-Cookie" : cookie}})
    }
    catch(error){
        return NextResponse.json({message:`Error : ${error}`} , {status:500})
    }

}