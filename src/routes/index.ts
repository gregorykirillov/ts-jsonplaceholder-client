import qs from 'query-string';
import { API_URL } from '../settings';

export const getAllPostsURL = () => `${API_URL}/posts`;

export const getAllCommentsURL = (postId: number) =>
    `${API_URL}/posts/${postId}/comments`;

// export const getItemURL = (id: number) => `${API_URL}/tasks/${id}`;

// export const getItemsURL = (params?: object) =>
//     `${API_URL}/tasks?${qs.stringify({ ...params })}`;

// export const addItemURL = `${API_URL}/addTask`;

// export const deleteItemURL = (id: number) => `${API_URL}/deleteTask/${id}`;

// export const updateItemURL = (id: number) => `${API_URL}/updateTask/${id}`;
