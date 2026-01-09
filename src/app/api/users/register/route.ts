import { registerUserDto } from "@/src/utils/dto";
import { registerUserSchema } from "@/src/utils/validationSchemas";
import { NextRequest , NextResponse } from "next/server";
import {prisma} from "../../../../../lib/prisma"
import bcrypt from "bcryptjs";
import {jwtPayload} from "../../../../utils/types"
import  {setCookie} from "../../../../utils/generateToken"

/**
 * @method POST
 * @route ~/api/users/register
 * @desc  Create New User
 * @access Public
 */

export async function POST (request:NextRequest){
    try{
        const body = (await request.json()) as registerUserDto
        const validation = registerUserSchema.safeParse(body)
        if(!validation.success){
            return NextResponse.json({message:validation.error.issues[0].message},{status:400})
        }

        const user = await prisma.user.findUnique({where : {email : body.email}})
        if (user){
            return NextResponse.json({message : "This user already registered "},
                {status:400}
            )
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(body.password , salt)
            const newUser = await prisma.user.create({
            data: {
                name: body.name,
                username: body.username,
                email: body.email,
                password: hashedPassword
            }, 
            select:{
                username:true,
                isAdmin:true,
                id:true
            }
        
            });
        const jwtPayload: jwtPayload = {
            id: newUser.id,
            username: newUser.username,
            isAdmin: newUser.isAdmin
        }
        
        const cookie = setCookie(jwtPayload);

        return NextResponse.json({newUser , message : "Register & Authanticated !"} , {status:201 , headers:{"Set-Cookie" : cookie}} )
    }
    catch(error){
        return NextResponse.json({message:`Error : ${error}`} , {status:500})
    }

}