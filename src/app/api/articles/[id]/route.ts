import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UpdateArticleDto } from "../../../../utils/dto";
import {verifyToken} from "../../../../utils/verifyToken"
interface Props {
  params: Promise<{ id: string }>;
}
/*
* @method GET
* @route ~/api/articles/:id
*/
export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  try {
        const params = await props.params;
        const userId = await params.id;

    const article = await prisma.article.findUnique({
      where: { id: Number(userId) },
      include: {comments:
        {include : {user:{
          select:{username:true , name:true} 
        }} , orderBy:{createdAt : "desc"}}
      }
    });

    if (!article) {
      return NextResponse.json(
        { message: "Article not found. Please provide a valid article ID" },
        { status: 404 }
      );
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/*
* @method PUT
* @route ~/api/articles/:id
*/

export async function PUT(request: NextRequest, { params }: Props) {
    try{
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.id);
  const body = (await request.json()) as UpdateArticleDto;

  const dataToUpdate: Partial<{ title: string; description: string }> = {};
  if (body.title !== undefined) dataToUpdate.title = body.title;
  if (body.description !== undefined) dataToUpdate.description = body.description;

  try {
        const user = verifyToken(request)
        if(user === null || user.isAdmin === false){
          return NextResponse.json(
            { message: "only admin , access denied ." },
            { status: 403 }
          );
        }

    const updatedArticle = await prisma.article.update({
      where: { id: articleId },
      data: dataToUpdate,
    });

    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error: any) {
    if (error.code === "P2025") {
      // Prisma error: record not found
      return NextResponse.json(
        { message: "Article not found. Please provide a valid article ID" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: `Error updating article: ${error.message}` },
      { status: 500 }
    );
  }
    }
    catch(error){
        return NextResponse.json(
      { message: `Error updating article: ${error}` },
      { status: 500 }
    );
    }


}

/*
* @method DELETE
* @route ~/api/articles/:id
*/
export async function DELETE(request: NextRequest, { params }: Props) {
    
  const resolvedParams = await params;
  const articleId = parseInt(resolvedParams.id);
  try {
        const user = verifyToken(request)
        if(user === null || user.isAdmin === false){
          return NextResponse.json(
            { message: "only admin , access denied ." },
            { status: 403 }
          );
        }
        const article = await prisma.article.findUnique({where : {id:articleId} , include:{comments:true}})
        if (!article){
                    return NextResponse.json(
            { message: "Article Not Found" },
            { status: 404 }
          );
        }

    await prisma.article.delete({
      where: { id : articleId },
    });
    
    const commentIds:number[] = article?.comments.map(comment=>comment.id)

    await prisma.comment.deleteMany({where : {id : { in : commentIds }}})
    
    return NextResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Could not delete article" },
      { status: 500 }
    );
  }
}




