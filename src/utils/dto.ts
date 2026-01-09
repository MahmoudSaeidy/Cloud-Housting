export interface UpdateArticleDto {
    title? :string,
    description?:string
}
export interface CreateArticleDto{
    title : string,
    description:string,
}
export interface registerUserDto{
    name : string,
    username:string,
    email:string,
    password:string
}
export interface loginUserDto{
    email:string,
    password:string
}
export interface updateUserDto{
    username? :string,
    password?:string,
    email?:string
}
export interface CreateCommentsDto{
    text:string,
    articleId:number
}
export interface UpdateCommentDto{
    text?:string
}