import axios from "axios";
const api = axios.create({
  baseURL: "https://recall-ai-mhmx.onrender.com",
  withCredentials: true,
}); 

export async function sendQuery(query) {
  try {
    const response = await api.post("/api/query/submit", { query, url: query });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to send query' };
  }
}
export async function getfolder(){
  try {
    const res = await api.get("/api/query/getfolder");
    return res.data?.data || [];
  } catch (err) {
    throw err.response?.data || { message: 'Failed to load folder' };
  }
}

export async function getsaves(id){
  try {
    const res = await api.get(`/api/query/getsaves/${id}`);
    return res.data?.data || [];
  } catch (err) {
    throw err.response?.data || { message: 'Failed to load saves' };
  }
}











