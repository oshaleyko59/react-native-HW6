import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
	name: "posts",
	initialState: { allPosts: [] },
	reducers: {
		addPost: (state, action) => {
			state.allPosts.push(action.payload.post);
		},
		removePost: (state, action) => {
			state.allPosts.splice(state.allPosts.indexOf(action.payload.id), 1);
		},
	},
});

export const addPost = postsSlice.actions.addPost;
export const removePost = postsSlice.actions.removePost;
export default postsSlice.reducer;
