import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types';

const STORAGE_KEY = 'comments';

const fetchCommentsFromStorage = (): Comment[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveCommentsToStorage = (comments: Comment[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
};

type CommentsState = {
  items: Comment[];
};

const initialState: CommentsState = {
  items: fetchCommentsFromStorage(),
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.items.push(action.payload);
      saveCommentsToStorage(state.items);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
      saveCommentsToStorage(state.items);
    },
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
