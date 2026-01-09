import type { Comment } from '@prisma/client';



export async function GetAllComment(token: string): Promise<Comment[]> {
  const response = await fetch("http://localhost:3000/api/comments", {
    headers: { Cookie: `jwtToken=${token}` }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  const comments: Comment[] = await response.json();
  return comments;
}
