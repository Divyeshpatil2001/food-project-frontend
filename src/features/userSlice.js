import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated : false,
        userId: null
    },
    
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
            state.userId = null
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.userId = action.payload.userId;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.userId = null;
        },
        logout: (state) => {
            state.user = null;
            state.userId = null;
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user_admin_status')
            state.isAuthenticated = false
        }
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectUserId = (state) => state.user.userId;

export const loginUser = (credential, navigate) => async (dispatch) => {
    dispatch(loginStart());

    try {
        const response = await axios.post('http://localhost:8000/accounts/api-login/', credential);
        const { access_token, refresh_token ,user_admin_status, user_id  } = response.data;

        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('user_admin_status', user_admin_status);

        dispatch(loginSuccess({ user: { access_token, user_admin_status }, userId: user_id }));

        if (user_admin_status === true) {
            navigate('/admin');
        } else {
            navigate('/');
        }

        console.log("Login successful");
    } catch (error) {
        dispatch(loginFailure(error.response ? error.response.data.detail || 'Login Failed' : 'Login Failed'));
        console.error('Login failed:', error);
    }
};

export default userSlice.reducer;
