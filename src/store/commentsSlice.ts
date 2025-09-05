import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Comment } from '../types'
import { endpoints } from '../api'

export type CommentsState = {
  items: Comment[]
  loading: boolean
  error: string | null
}

const initialState: CommentsState = { items: [], loading: false, error: null }

export const fetchComments = createAsyncThunk<Comment[], number>('comments/fetch', async (productId) => {
  const res = await fetch(endpoints.commentsByProduct(productId))
  if (!res.ok) throw new Error('Failed to fetch comments')
  return (await res.json()) as Comment[]
})

export const addComment = createAsyncThunk<Comment, Omit<Comment, 'id'>>('comments/add', async (payload) => {
  const res = await fetch(endpoints.comments, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Failed to add comment')
  return (await res.json()) as Comment
})

export const deleteComment = createAsyncThunk<number, number>('comments/delete', async (id) => {
  const res = await fetch(`${endpoints.comments}/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete comment')
  return id
})

const slice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (s) => { s.loading = true; s.error = null })
      .addCase(fetchComments.fulfilled, (s, { payload }) => { s.loading = false; s.items = payload })
      .addCase(fetchComments.rejected, (s, { error }) => { s.loading = false; s.error = error.message || 'Error' })
      .addCase(addComment.fulfilled, (s, { payload }) => { s.items.push(payload) })
      .addCase(deleteComment.fulfilled, (s, { payload }) => { s.items = s.items.filter(c => c.id !== payload) })
  }
})

export default slice.reducer