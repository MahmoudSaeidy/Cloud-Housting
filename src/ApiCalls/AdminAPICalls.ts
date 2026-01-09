import type { Comment } from '@prisma/client';
import {DOMAIN} from "@/src/utils/constants"



export async function GetAllComment(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}api/comments`, {
    headers: { Cookie: `jwtToken=${token}` }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  const comments: Comment[] = await response.json();
  return comments;
}
