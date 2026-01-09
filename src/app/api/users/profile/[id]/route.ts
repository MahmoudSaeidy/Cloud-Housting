import { NextRequest, NextResponse, userAgent } from "next/server";
import { prisma } from "../../../../../../lib/prisma";
import jwt from "jsonwebtoken";
import { jwtPayload } from "@/src/utils/types";
import { verifyToken } from "@/src/utils/verifyToken";
import { updateUserDto } from "@/src/utils/dto";
import { email } from "zod";
import bcrypt from "bcryptjs";
import {updateProfileSchema} from "../../../../../utils/validationSchemas"

/**
 * @method DELETE
 * @route ~/api/users/profile/:id
 * @desc Delete Profile
 * @access Private (only user himself can delete his account)
 */

export async function DELETE(
    request: NextRequest,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const params = await props.params;
        const userId = params.id;

        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) }});

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            return NextResponse.json(
                { message: "Server configuration error" },
                { status: 500 }
            );
        }

        
        const userFromToken = verifyToken(request);

        if (!userFromToken) {
            return NextResponse.json(
                { message: "Invalid or expired token" },
                { status: 401 }
            );
        }



        if (userFromToken.id !== Number(userId)) {
            return NextResponse.json(
                { message: "Only user himself can delete his profile, forbidden" },
                { status: 403 }
            );
        }
        const userData = await prisma.user.findUnique({where : {id:parseInt(userId)} , include:{comments:true}})


        if (!userData){
            return NextResponse.json(
            { message: `Error` },
            { status: 400 }
            );
        }
        const commentIds:number[] = userData?.comments.map(comment => comment.id)
        if (commentIds.length > 0){
            await prisma.comment.deleteMany({where : {id : { in : commentIds }}})
                    await prisma.user.delete({
            where: { id: parseInt(userId) }});
            
        }
        else {
                                await prisma.user.delete({
            where: { id: parseInt(userId) }});
        }
        


        return NextResponse.json(
            { message: "Done, Deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Delete error:", error);
        
        if (error instanceof Error) {
            return NextResponse.json(
                { message: `Error: ${error.message}` },
                { status: 500 }
            );
        }
        
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

/**
 * @method GET
 * @route ~/api/users/profile/:id
 * @desc GET Profile by ID
 * @access Private (only user himself can get his account)
 */

export async function GET(request:NextRequest , props: { params: Promise<{ id: string }>}) {
    try {
        const params = await props.params;
        const userId = params.id;
        const user = await prisma.user.findUnique({where : {id: parseInt(userId)}})

        if(!user){
            return NextResponse.json({message : "User not found" }, {status:404})
        }

        const userFromToken = verifyToken(request)

        if (userFromToken === null || userFromToken.id !== user.id){
            return NextResponse.json({message:"you are not allowed , access denied"} , {status:403})
        }
        return NextResponse.json(user , {status:201})
    }
    catch(error){
        return NextResponse.json({message :"internal server error"} ,{status:500})
    }
}

/**
 * @method PUT
 * @route ~/api/users/profile/:id
 * @desc Update Profile
 * @access Private (only user himself can Update his account)
 */

export async function PUT(request:NextRequest , props: { params: Promise<{ id: string }>}) {
    try{
        const params = await props.params;
        const userId = params.id;
        const user = await prisma.user.findUnique({where : {id: parseInt(userId)}})

        if(!user){
            return NextResponse.json({message : "User not found" }, {status:404})
        }

        const userFromToken = verifyToken(request)

        if (userFromToken === null || userFromToken.id !== user.id){
            return NextResponse.json({message:"you are not allowed , access denied"} , {status:403})
        }

        const body = await request.json() as updateUserDto
        const validation = updateProfileSchema.safeParse(body)
        if(!validation.success){
            return NextResponse.json({message : validation.error.issues[0].message} , {status:400})
        }
        if(body.password){
            const salt = await bcrypt.genSalt(10)
            body.password = await bcrypt.hash(body.password , salt)
        }

        const updateUser = await prisma.user.update({
        where : {id:parseInt(userId)} ,
         data:{
            username : body.username,
            email:body.email,
            password:body.password
        }})
        const {password , ...other} = updateUser
        return NextResponse.json( {...other} , {status:200})

    }
    catch(error){
        NextResponse.json({message :"internal server error"} ,{status:500})
    }
}