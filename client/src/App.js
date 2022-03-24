import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from "./features/nav/navbar";
import TasksList from "./features/taskList/tasksList";
import EditTask from "./pages/editTask";
import CreateTask from "./pages/createTask";
import Error from "./pages/error";

export default function App() {
    
    
    return(
        <Router>
        <Navbar />
        <Routes>
          <Route  exact path='/' element={<TasksList />}></Route>
          <Route  exact path='editTask/:id' element={<EditTask />}></Route>
          <Route  exact path='createTask/' element={<CreateTask />}></Route>
          <Route  exact path='*' element={<Error />}></Route>
        </Routes>
      </Router>
    )
    
}


/*
          <Route  exact path='/createTask'>
            <CreateTask />  
          </Route>
*/
