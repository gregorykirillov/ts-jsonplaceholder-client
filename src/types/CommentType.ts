export type CommentType = {
    id: number;
    postId: number;
    body: string;
    email: string;
    name: string;
    /* Fake kids for nested comments */
    kids: CommentType[];
};
