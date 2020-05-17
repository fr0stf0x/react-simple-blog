import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: '',
        token: '',
        isLoggedIn: false
    },
    reducers: {
        login(state, action) {
            const {email, token, password} = action.payload;
            
            state.isLoggedIn = true;
            state.email = email;
            state.token = token;
            state.password = password;
        },
        signup(state, action) {
            const {email, token, password} = action.payload;

            state.isLoggedIn = true;
            state.email = email;
            state.token = token;
            state.password = password;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.email = '';
            state.password = '';
            state.token = '';
        }
    }
});

export const {
    login,
    signup,
    logout
} = userSlice.actions;

export default userSlice.reducer;