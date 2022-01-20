import React, {Component} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';



class Editstudent extends Component {

   state = {
      name: "",
      course: "",
      email: "",
      phone: "",
   }
   handleInput = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      });

   }
  
   getId (path) {
      path = path.split("/");
      return path[path.length-1];
   }

   async componentDidMount() {
    
     const studentId = this.getId(window.location.pathname);
     
      
      const res = await axios.get(`http://127.0.0.1:8000/api/edit-student/${studentId}`);
     // console.log(res);
      if(res.data.status === 200) {
         console.log(res.data.student);
         this.setState({
            name: res.data.student.name,
            course: res.data.student.course,
            email: res.data.student.email,
            phone: res.data.student.phone,

         })
     }
   }
   updateStudent = async (e) => {

      e.preventDefault();
      document.getElementById('updateBtn').innerText = "Updating";
      document.getElementById('updateBtn').disabled = true;
      const studentId = this.getId(window.location.pathname);
      const res = await axios.put(`http://127.0.0.1:8000/api/update-student/${studentId}`, this.state);
      if(res.data.status === 200) {
         swal({
            title: "Success",
            text: res.data.message,
            icon: "success",
            button:"Done",
          });
         document.getElementById('updateBtn').innerText = "Save";
         document.getElementById('updateBtn').disabled = false  ;

      }
   
   }

   render() {
      return (
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="card">
                     <div className="card-header">
                        <h4> Edit student </h4>
                        <Link to={'/'} className="btn btn-primary btn-sm float-end">
                           Back
                        </Link>
                        <div className="card-body">
                           <form onSubmit={this.updateStudent}>  
                              <div className="form-group mb-3">
                                 <label>
                                    Student name
                                 </label>
                                 <input type="text" name="name" 
                                 onChange={this.handleInput}
                                 value={this.state.name}
                                 className="form-control">

                                 </input>
                              </div>
                              <div className="form-group mb-3">
                                 <label>
                                    Student Course
                                 </label>
                                 <input type="text" name="course" 
                                 onChange={this.handleInput}
                                 value={this.state.course}
                                 className="form-control">
                                    
                                 </input>
                              </div>
                              <div className="form-group mb-3">
                                 <label>
                                    Student Email
                                 </label>
                                 <input type="text" name="email" 
                                 onChange={this.handleInput}
                                 value={this.state.email}
                                 className="form-control">
                                    
                                 </input>
                              </div>
                              <div className="form-group mb-3">
                                 <label>
                                    Student Phone
                                 </label>
                                 <input type="text" name="phone" 
                                 onChange={this.handleInput}
                                 value={this.state.phone}
                                 className="form-control">
                                    
                                 </input>
                              </div>
                              <div className="form-group mb-3">
                                
                                 <button id="updateBtn" type="submit" className="btn btn-primary">
                                    Save
                                 </button>
                              </div>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
export default Editstudent;