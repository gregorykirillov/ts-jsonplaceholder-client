import { API_URL } from '../settings';

export const getAllPostsURL = `${API_URL}/posts`;
export const getPostURL = (postId: number) => `${API_URL}/posts/${postId}`;
export const createPostURL = `${API_URL}/posts`;
export const updatePostURL = (postId: number) => `${API_URL}/posts/${postId}`;
export const deletePostURL = (postId: number) => `${API_URL}/posts/${postId}`;

export const getAllCommentsURL = (postId: number) =>
    `${API_URL}/posts/${postId}/comments`;

export const getAllAlbumsURL = `${API_URL}/albums`;
export const getAlbumUrl = (albumId: number) => `${API_URL}/album/${albumId}`;
export const getAlbumPhotosURL = (albumId: number) =>
    `${API_URL}/albums/${albumId}/photos`;
export const createAlbumURL = `${API_URL}/albums`;
export const updateAlbumURL = (albumId: number) =>
    `${API_URL}/albums/${albumId}`;
export const deleteAlbumURL = (albumId: number) =>
    `${API_URL}/albums/${albumId}`;

export const getUserByIdURL = (userId: number) => `${API_URL}/users/${userId}`;

export const getAllTodosURL = `${API_URL}/todos`;
export const getTodoURL = (todoId: number) => `${API_URL}/todos/${todoId}`;
export const createTodoURL = `${API_URL}/todos`;
export const updateTodoURL = (todoId: number) => `${API_URL}/todos/${todoId}`;
export const deleteTodoURL = (todoId: number) => `${API_URL}/todos/${todoId}`;
