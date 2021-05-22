import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

// const auth = {
//     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhNjQ4NDMyZjgwM2E3NjJjZGY4YjhlIiwiZW1haWxJZCI6ImJoYXZlc2hzb25nYXJhMTQzK3NoaXZkZW1vMUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJzaGl2IiwibGFzdE5hbWUiOiJjaGl0YXJhIn0sImlhdCI6MTYyMTUxNjc3MywiZXhwIjoxNjIxNTE2ODMzfQ.EAeMxiYrgJhYI9867wd6xny2gaCvtnUs90cgIiBAHUU",
//     user: {
//         id: "60a648432f803a762cdf8b8e",
//         emailId: "bhaveshsongara143+shivdemo1@gmail.com",
//         firstName: "shiv",
//         lastName: "chitara"
//     }
// };

export const authSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {
        signIn: (state, action) => {
            const decoded = jwtDecode(action.payload.accessToken);
            return {
                accessToken: action.payload.accessToken,
                user: decoded.user
            }
        },
        signOut: (state, action) => {
            return {};
        }
    }
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;
