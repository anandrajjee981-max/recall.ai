import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
    folder: [],
    saves: [],
    loading: false,
    error: null,    
};  

const querySlice = createSlice({
  name: 'query',
  initialState, 
    reducers: {
setQuery(state, action) {
      state.query = action.payload; 
},
receiveFolder(state, action) {
      state.folder = action.payload; 
      state.loading = false;
},
receiveSaves(state, action) {
      state.saves = action.payload; 
      state.loading = false;
}   


    }
});
export const { setQuery, receiveFolder, receiveSaves } = querySlice.actions;  
export default querySlice.reducer;











