import { API_URL } from '../settings';

export const getAllPostsURL = `${API_URL}/posts`;
export const createPostURL = `${API_URL}/posts`;

export const getAllCommentsURL = (postId: number) =>
    `${API_URL}/posts/${postId}/comments`;

export const getAllAlbumsURL = `${API_URL}/albums`;

export const getAlbumPhotosURL = (albumId: number) =>
    `${API_URL}/albums/${albumId}/photos`;

export const getUserByIdURL = (userId: number) => `${API_URL}/users/${userId}`;
