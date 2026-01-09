import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../lib/prisma"
import {verifyToken} from "../../../utils/verifyToken"
import { CreateCommentsDto } from "@/src/utils/dto";
import { CreateCommentSchema } from "@/src/utils/validationSchemas";


/**
 * @method POST
 * @route ~/api/comments/
 * @desc Create New Comment
 * @access Private (only loggin users)
 */



export async function POST(request:NextRequest) {
    try{
      const user = await verifyToken(request)
      if(!user){
        return NextResponse.json({message : "only logged in user , access denied"} , {status:401})
      }

      const body = await request.json() as CreateCommentsDto
      const validation = CreateCommentSchema.safeParse(body)

      if (!validation.success){
        return NextResponse.json({message : validation.error.issues[0].message} , {status:400})
      }


      const newComment = await prisma.comment.create(
{        data:{        
        text : body.text,
        articleId : Number(body.articleId),
        userId:user.id
      },include:{user:true}})
      return NextResponse.json(newComment , {status:201})
    }

    catch(error){
        return NextResponse.json({message : "internal server error"} , {status:500})
    }
    


 /**
 * @method GET
 * @route ~/api/comments/
 * @desc Get All comments
 * @access Private (only admin)
 */

}
export async function GET(request:NextRequest){
  try{
      const user = await verifyToken(request)
      if(user == null || user.isAdmin === false ){
        return NextResponse.json({message : "only admin can access , access denied"} , {status:403})
      }
      const comments = await prisma.comment.findMany()

      return NextResponse.json(comments , {status:200})


  }
  catch(error){
     return NextResponse.json({message : "internal server error"} , {status:500})
  }
}