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
    },
    updateIsDeletedTask: (state, action) => {
      state.value[action.payload].isDeleted = !state.value[action.payload].isDeleted;
    }
  },
})

export const { setTasks, loadingTasks, updateIsDeletedTask } = tasksSlice.actions

export default tasksSlice.reducer