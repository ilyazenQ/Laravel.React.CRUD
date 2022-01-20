<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function index() {
        $students = Student::all();
        return response()->json([
            "status"=>200,
            "message"=>"Got all students",
            'students'=>$students,
        ]);
    }
    public function store(Request $request) {

        $validator = Validator::make(
        $request->all(), [
            'name'=>'required',
            'course'=>'required',
            'email'=>'required',
            'phone'=>'required',
        ]
         );
         if($validator->failed()) {
            return response()->json([
                'validate_error'=>$validator->messages(),
                'message'=>'Added failed'
            ]);
         } else { 
        $student = new Student;
        $student->name = $request->input('name');
        $student->course = $request->input('course');
        $student->email = $request->input('email');
        $student->phone = $request->input('phone');
        $student->save();

        return response()->json([
            'status'=>200,
            'message'=>'Added successfully'
        ]);
    }
    }
    public function edit($id) {
        $student = Student::find($id);
        return response()->json([
            'status'=>200,
            'student'=>$student,
        ]);
    }
    public function update(Request $request,$id) {
        $student = Student::find($id);
        $student->name = $request->input('name');
        $student->course = $request->input('course');
        $student->email = $request->input('email');
        $student->phone = $request->input('phone');
        $student->save();
        return response()->json([
            'status'=>200,
            'message'=>'updated successfully'
        ]);
    }
    public function delete(Request $request,$id) {
        $student = Student::find($id);    
        $student->delete();
        return response()->json([
            'status'=>200,
            'message'=>'deleted successfully'
        ]);
    }
}
