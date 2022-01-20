import axios from "axios";
import React, {Component} from "react";
import {Link} from "react-router-dom";

class Student extends Component {
   state = {
      students:[],
      loading:true,
   }

  async componentDidMount() {

      const res = await axios.get('http://127.0.0.1:8000/api/students');
      console.log(res);
      if(res.data.status === 200) {
         this.setState({
            students: res.data.students,
            loading:false,


         })
      }
   }
   deleteStudent = async (e, id) => {
      const currentTargetBtn = e.currentTarget;
      currentTargetBtn.innerText = 'Deleting';
      const res = await axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}`,id);
      if(res.data.status === 200) {
         console.log(res.data.message);
         currentTargetBtn.closest('tr').remove();
      }

   }

   render() {
      let student_HTMLTABLE = "";
      if(this.state.loading) {
         student_HTMLTABLE = <tr>
            <td colSpan="7">
               <h2> Loading </h2>
            </td>
         </tr>
      } else {
         student_HTMLTABLE = this.state.students.map(
            (item) => {
               return(
                  <tr key={item.id}>
                     <td> {item.id} </td>
                     <td> {item.name} </td>
                     <td> {item.course} </td>
                     <td> {item.email} </td>
                     <td> {item.phone} </td>
                     <td> <Link to={`edit-student/${item.id}`} className="btn btn-success">Edit</Link> </td>
                     <td> <button onClick={(e) => this.deleteStudent(e,item.id)} className="btn btn-danger">Delete</button> </td>

                  </tr>
               )
            }
         );
      }
      return (
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="card">
                     <div className="card-header">
                        <h4> Students Data</h4>
                        <Link to={'add-student'} className="btn btn-primary btn-sm float-end">
                           Add new student
                        </Link>
                        <div className="card-body">
                           <table className="table table-bordered table-striped">
                              <thead>
                                 <tr>
                                 <th>ID</th>
                                 <th>Name</th>
                                 <th>Course</th>
                                 <th>Email</th>
                                 <th>Phone</th>
                                 <th>Edit</th>
                                 <th>Delete</th>
                                 </tr>
                              </thead>
                              <tbody>
                                  {student_HTMLTABLE}
                              </tbody>


                           </table>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
export default Student;