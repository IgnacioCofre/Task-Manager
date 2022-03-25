import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value : [],
  loading: true,
}

export const tasksSlice = createSlice({
  name: 'Tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      return {
        value: action.payload,
        loading: false
      }
    },
    loadingTasks: (state) => {
      return {
        ...state,
        loading: true
      }
    }
  },
})

export const { setTasks, loadingTasks } = tasksSlice.actions

export default tasksSlice.reducer