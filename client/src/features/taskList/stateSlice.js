import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value : [],
  loading: true,
  order: "dateCreation"
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
    orderTasks : (state, action) => {
      return {
        order: action.payload,
      }
    }
  },
})

export const { setTasks, loadingTasks, orderTasks } = tasksSlice.actions

export default tasksSlice.reducer