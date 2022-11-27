import { API_URL } from '../settings';

export const POSTS_PATH = '/posts';
export const TODOS_PATH = '/todos';
export const USERS_PATH = '/users';
export const ALBUMS_PATH = '/albums';
export const PHOTOS_PATH = '/photos';
export const COMMENTS_PATH = '/comments';

export const getAllPostsURL = `${API_URL + POSTS_PATH}`;
export const getPostURL = (postId: number) =>
    `${API_URL + POSTS_PATH}/${postId}`;
export const createPostURL = `${API_URL + POSTS_PATH}`;
export const updatePostURL = (postId: number) =>
    `${API_URL + POSTS_PATH}/${postId}`;
export const deletePostURL = (postId: number) =>
    `${API_URL + POSTS_PATH}/${postId}`;

export const getAllCommentsURL = (postId: number) =>
    `${API_URL + POSTS_PATH}/${postId + COMMENTS_PATH}`;

export const getAllAlbumsURL = `${API_URL + ALBUMS_PATH}`;
export const getAlbumURL = (albumId: number) =>
    `${API_URL + ALBUMS_PATH}/${albumId}`;
export const createAlbumURL = `${API_URL + ALBUMS_PATH}`;
export const updateAlbumURL = (albumId: number) =>
    `${API_URL + ALBUMS_PATH}/${albumId}`;
export const deleteAlbumURL = (albumId: number) =>
    `${API_URL + ALBUMS_PATH}/${albumId}`;

export const getAlbumPhotosURL = (albumId: number) =>
    `${API_URL + ALBUMS_PATH}/${albumId + PHOTOS_PATH}`;
export const deletePhotoURL = (photoId: number) =>
    `${API_URL + PHOTOS_PATH}/${photoId}`;

export const getUserByIdURL = (userId: number) =>
    `${API_URL + USERS_PATH}/${userId}`;

export const getAllTodosURL = `${API_URL + TODOS_PATH}`;
export const getTodoURL = (todoId: number) =>
    `${API_URL + TODOS_PATH}/${todoId}`;
export const createTodoURL = `${API_URL + TODOS_PATH}`;
export const updateTodoURL = (todoId: number) =>
    `${API_URL + TODOS_PATH}/${todoId}`;
export const deleteTodoURL = (todoId: number) =>
    `${API_URL + TODOS_PATH}/${todoId}`;
