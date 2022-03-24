import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/taskList/stateSlice';

export default configureStore({
    reducer: {
        Tasks: taskReducer
    },
  });
  
