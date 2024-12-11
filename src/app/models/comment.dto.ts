export interface CommentDTO{
    id: number,
    postId: number,
    userId: number,
    text: string
  }

export interface CreateCommentDTO{
    userId: number,
    postId: number,
    text: string
  }