import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  withCredentials: true,
}); 

export async function register(username, email, password) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: error.message || 'Registration failed' };
  } 
}
export async function login(email, password) {
    try {
        const response = await api.post("/api/auth/login", {    
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: error.message || 'Login failed' };
    } 
}

export async function getme(){
    try{
const res=await api.get("/api/auth/getme");
return res.data;
    }
    catch(err){
        throw err.response?.data || { message: 'Failed to load user' };
    }
}










