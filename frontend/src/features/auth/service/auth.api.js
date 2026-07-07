import axios from "axios";
const api = axios.create({
  baseURL: "https://recall-ai-mhmx.onrender.com",
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
    throw error.response.data;
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
        throw error.response.data;
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










