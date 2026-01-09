import { NextRequest, NextResponse, userAgent } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { verifyToken } from "@/src/utils/verifyToken";
import {UpdateCommentDto} from "../../../../utils/dto"

interface Props {
    params:{id:string}
}


/**
 * @method PUT
 * @route ~/api/comment/:id
 * @desc Update Comment
 * @access Private (only owner of the comment)
 */

export async function PUT(request:NextRequest ,  props: { params: Promise<{ id: string }>}) {
    try{    
        const params = await props.params;
        const userId = params.id;
        const comment = await prisma.comment.findUnique({where : {id:parseInt(userId)}})

        if (!comment){
            return NextResponse.json({message : "Comment is not found"} , {status:404})
        }

        const user = verifyToken(request)

        if (user == null || user.id !== comment.userId){
              return NextResponse.json({message : "you are not allowed , access denied"} , {status:404})
        }
        const body = await request.json() as UpdateCommentDto
        const updatedComment = await prisma.comment.update({where:{id:parseInt(userId)}, data:{
            text : body.text
        }})

        return NextResponse.json(updatedComment , {status:200})
    }
    catch(error){
        return NextResponse.json({message : "internal server error"} , {status:500})
    }
    
}


/**
 * @method DELETE
 * @route ~/api/comment/:id
 * @desc Delete
 * @access Private (only owner of the comment)
 */

export async function DELETE(request:NextRequest ,  props: { params: Promise<{ id: string }>}){
    try{
        const params = await props.params;
        const userId = params.id;
        const user = verifyToken(request)
        const comment = await prisma.comment.findUnique({where:{id:parseInt(userId)}})
        if (user?.isAdmin || user?.id === comment?.userId){
        await prisma.comment.delete({where:{id:parseInt(userId)}})
        return NextResponse.json({message : "Deleted successfuly"} , {status:200})
        }
        return NextResponse.json({message : "you are not allowed , access denied"} , {status:401})

    }
    catch(error){
        return NextResponse.json({message : "internal server error"} , {status:500})
    }
}