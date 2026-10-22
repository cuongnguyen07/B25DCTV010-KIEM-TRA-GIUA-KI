export interface Post {
  id: number | string;
  title: string;
  body: string;
  userId?: number;
}

export interface Comment {
  id: number;
  postId: number | string;
  name: string;
  email: string;
  body: string;
}
