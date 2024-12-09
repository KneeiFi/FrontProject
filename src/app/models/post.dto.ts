export interface PostDTO {
    id: number;
    description: string | null;
    media: string | null;
    likesCount: number;
    userId: number;
  }

  export interface CreatePost{
    description: string | null;
    media: string | null;
    likesCount: number;
    userId: number;
  }