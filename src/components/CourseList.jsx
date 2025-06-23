import React,{useState}from 'react'
import { useEffect } from 'react'
import { deleteCourse, listCourse } from '../services/CourseService'
import { useNavigate } from 'react-router-dom'

const CourseList = () =>{
  const [course,setCourse]=useState([])
   const navigator=useNavigate();
    
   useEffect(()=>{
        listCourse().then((response)=>{
            setCourse(response.data);
        }).catch(error=>{
            console.error(error);
        })
  },[])
   
  
    function addNewCourse(){
       navigator('/add-courses');
    }

    function removeCourse(courseId){
        console.log(courseId);
        deleteCourse(courseId).then((response)=>{
            console.log(response.data);
            alert("✅ Course deleted successfully!");
            window.location.reload();
        }).catch((error) => {
        alert(`❌ Error: ${error.response?.data || 'Unknown error occurred'}`);
        console.error(error);
        
      });
    }

function getByIdCourse(id){
   navigator(`/courses/${id}`);
}

function toInstance(){
    navigator('/instances');
}
    return (
    <div className='container'>
        <h2 className='text-center'>List Of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addNewCourse}>Add Course</button>
        <button className='btn btn-primary mb-2' onClick={toInstance}>Create Instance</button>
        <table className='table table-striped table-bordered '>
            <thead>
                <tr>
                    <th>Corse Title</th>
                    <th>Corse Id</th>
                    <th>Description</th>
                    <th>Prerequisites</th>
                    <th>Delete Action</th>
                </tr>
                </thead>
                <tbody>
                    {course.map(CourseItem=>
                    <tr key={CourseItem.courseId}>
                            <td>{CourseItem.courseId}</td>
                            <td>{CourseItem.courseTitle}</td>
                            <td>{CourseItem.description}</td>
                            <td>{CourseItem.prerequisites}</td>
                            <td>
                                <button className='btn btn-danger' onClick={()=>removeCourse(CourseItem.courseId)}>Delete</button>
                                <button className='btn btn-info' onClick={()=>getByIdCourse(CourseItem.courseId)}>View</button>
                            </td>
                    </tr>)}
                </tbody>
        </table>
    </div>
  )
}

export default CourseList