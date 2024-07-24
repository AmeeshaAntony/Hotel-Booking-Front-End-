import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);

export const register = async (formData: RegisterFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

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

export const signIn = async (formData: SignInFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

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

export const validateToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Invalid Token');
    }

    const responseBody = await response.text();
    return responseBody ? JSON.parse(responseBody) : {};
  } catch (error) {
    console.error('Failed to validate token:', error);
    throw error;
  }
};
export const signOut=async()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:'include',
        method:"POST",
    })
    if(!response.ok){
        throw new Error("Error during sign out");
    }
}

