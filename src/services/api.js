import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

//Llamadas a las peticiones 
export const getPosts = () => axios.get(`${API_URL}/posts`);
export const getPost = (id) => axios.get(`${API_URL}/posts/${id}`);
export const getComments = (postId) => axios.get(`${API_URL}/comments`, { params: { postId } });
export const addPost = (post) => axios.post(`${API_URL}/posts`, post);
export const updatePost = (id, post) => axios.put(`${API_URL}/posts/${id}`, post);
export const deletePost = (id) => axios.delete(`${API_URL}/posts/${id}`);
export const getUser = (id) => axios.get(`${API_URL}/users/${id}`);
