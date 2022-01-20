import React, {Component} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import Student from "./pages/Student";
import Addstudent from "./pages/Addstudent";
import Editstudent from "./pages/Editstudent";
function App() {
  return (
    <Router>
      <Routes>
          <Route  path="/" element={<Student></Student>}>
          </Route>
          <Route  path="/add-student" element={<Addstudent></Addstudent>}>
          </Route>
          <Route  path="edit-student/:id" element={<Editstudent></Editstudent>}>
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
