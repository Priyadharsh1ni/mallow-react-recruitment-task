import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetchUsers, apiCreateUser, apiUpdateUser, apiDeleteUser } from '../../api';


export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page = 1) => {
  const response = await apiFetchUsers(page);
  return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async (userData) => {
  const response = await apiCreateUser(userData);
  return response.data; 
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, data }) => {
  const response = await apiUpdateUser(id, data);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  await apiDeleteUser(id);
  return id;
});


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = { ...state.list[index], ...action.payload };
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter(user => user.id !== action.payload);
      });
  },
});


export const {} = usersSlice.actions;
export default usersSlice.reducer;