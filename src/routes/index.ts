import { API_URL } from '../settings';

export const getAllPostsURL = `${API_URL}/posts`;
export const createPostURL = `${API_URL}/posts`;
export const getAllAlbumsURL = `${API_URL}/albums`;
export const getAllTodosURL = `${API_URL}/todos`;

export const getPostURL = (postId: number) => `${API_URL}/posts/${postId}`;

export const getAllCommentsURL = (postId: number) =>
    `${API_URL}/posts/${postId}/comments`;

export const getAlbumPhotosURL = (albumId: number) =>
    `${API_URL}/albums/${albumId}/photos`;

export const getUserByIdURL = (userId: number) => `${API_URL}/users/${userId}`;

export const deletePostURL = (postId: number) => `${API_URL}/posts/${postId}`;
export const editPostURL = (postId: number) => `${API_URL}/posts/${postId}`;
