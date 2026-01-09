import {Comment , User } from "@prisma/client"
export type Article = {
  id:number,
  userId : number , 
  title : string , 
  description : string,
} 
export type jwtPayload = {
    id:number,
    isAdmin:Boolean,
    username:string,
}
export type CommentWithUser= Comment & {user:User}

export type ArticleWithComment = Article & {comments:CommentWithUser[]}


