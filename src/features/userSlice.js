import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        userDetail : null,
        loading: false,
        error: null,
        isAuthenticated : false,
    },
    
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
            state.isAuthenticated = false;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.userDetail = action.payload.user_detail;
            state.isAuthenticated = true;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logout: (state) => {
            state.user = null;
            state.userDetail = null;
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('user_admin_status')
            state.isAuthenticated = false
        },
        updateUserDetail: (state, action) => {
            state.userDetail = action.payload;
            
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout,updateUserDetail } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export const loginUser = (credential, navigate) => async (dispatch) => {
    dispatch(loginStart());

    try {
        const response = await axios.post('http://localhost:8000/accounts/api-login/', credential);
        const { access_token, refresh_token ,user_admin_status, user_id, user_detail } = response.data;
        console.log(response.data.user_detail)
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('user_admin_status', user_admin_status);

        dispatch(loginSuccess({  user:{ access_token, user_admin_status,refresh_token,user_id}, user_detail:user_detail }));

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
