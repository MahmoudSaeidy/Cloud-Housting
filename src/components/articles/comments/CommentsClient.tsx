"use client"

import { CommentWithUser } from "@/src/utils/types"
import CommentItem from "./CommentItem"

interface Props {
  comments: CommentWithUser[]
  userId?: number
}

const CommentsClient = ({ comments, userId }: Props) => {
  return (
    <>
      {comments.map(comment => (
        <CommentItem
          key={comment.id}
          comment={comment}
          userId={userId}
        />
      ))}
    </>
  )
}

export default CommentsClient
