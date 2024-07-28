import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
//import { BookingFormData } from "./forms/BookingForm/BookingForm";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";



export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      console.error("Login failed:", response.status, responseBody.message || response.statusText);
      throw new Error(responseBody.message || "Login failed");
    }

    console.log("Login successful:", responseBody);
    return responseBody;
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error(`Error during sign-in: `);
  }
};




export const validateToken = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
    });

    if (!response.ok) {
      console.error("Token validation failed:", response.status, response.statusText);
      throw new Error("Token invalid");
    }

    const responseBody = await response.json();
    console.log("Token validation successful:", responseBody);
    return responseBody;
  } catch (error) {
    console.error("Error during token validation:", error);
    throw error;
  }
};



export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  console.log('Sending data:', hotelFormData);
  const response = await fetch('/api/hotels', {
    method: 'POST',
    body: hotelFormData,
  });

  console.log('Response status:', response.status);
  if (!response.ok) {
    throw new Error('Failed to add hotel');
  }

  return response.json();
};


