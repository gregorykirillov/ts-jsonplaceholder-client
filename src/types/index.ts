export type AlbumType = {
    id: number;
    userId: number;
    title: string;
};

export type CommentType = {
    id: number;
    postId: number;
    body: string;
    email: string;
    name: string;
    /* Fake kids for nested comments */
    kids: CommentType[];
};

export type PhotoType = {
    id: number;
    albumId: number;
    title: string;
    url: string;
    thumbnailUrl: string;
};

export type PostType = {
    id: number;
    userId: number;
    body: string;
    title: string;
};

export type TodoType = {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
};

export type UserType = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
};
