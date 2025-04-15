// src/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';  // Your Flask API URL

export const createUser = async (name, email) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      name: name,
      email: email,
    });
    return response.data;  // returns the created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;  // returns the list of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
