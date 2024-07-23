import { RegisterFormData } from './pages/Register';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    });

    // Check if the response has a body
    const responseBody = await response.text();
    const data = responseBody ? JSON.parse(responseBody) : {};

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};
