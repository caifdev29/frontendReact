import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Así se accede en Vite
});

export const loginUser = async (userData: object) => {
  try {
    const response = await api.post('/login', userData);
    return response.data; // Aquí recibes el token de AWS
  } catch (error) {
    throw error;
  }
};