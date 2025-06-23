
import React, { useEffect, useState } from 'react';
import { getByIdCourse } from '../services/CourseService';
import { useNavigate ,useParams} from 'react-router-dom';

const SingleCourseComponent = () => {
    
 const [courseTitle, setCourseTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');
  const [prerequisites, setPrerequisites] = useState('');

  const navigator=useNavigate();
  
  const {id}=useParams();
   
function navigate(){
    navigator('/courses')
}

  useEffect(()=>{
        if(id){
            getByIdCourse(id).then((response)=>{
                console.log(response.data.courseTitle);
                setCourseId(response.data.courseId);
                setCourseTitle(response.data.courseTitle);
                setDescription(response.data.description);
                setPrerequisites(response.data.prerequisites);

            }).catch((error) => {
        alert(`❌ Error: ${error.response?.data || 'Unknown error occurred'}`);
        console.error(error);
      });
        }
  },[id])

   return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
             <h2 className='text-center'>Single Course Details</h2>
          <div className='card-body'>
           
              <div className='form-group mb-2'>
                <label htmlFor='courseTitle'>Course Title</label>
                <input
                  type='text'
                  id='courseTitle'
                  name='courseTitle'
                  placeholder='Course Name'
                  required
                  className='form-control'
                  value={courseTitle}
                  readOnly
                />
              </div>

              <div className='form-group mb-2'>
                <label htmlFor='courseId'>Course ID</label>
                <input
                  type='text'
                  id='courseId'
                  name='courseId'
                  placeholder='Course ID (e.g. CS123)'
                  required
                  className='form-control'
                  value={courseId}
                  readOnly
                />
              </div>

              <div className='form-group mb-2'>
                <label htmlFor='description'>Description</label>
                <input
                  type='text'
                  id='description'
                  name='description'
                  placeholder='Course Description'
                  required
                  className='form-control'
                  value={description}
                  readOnly
                />
              </div>

              <div className='form-group mb-2'>
                <label htmlFor='prerequisites'>Prerequisites</label>
                <input
                  type='text'
                  id='prerequisites'
                  name='prerequisites'
                  placeholder='Course Does Not Have Prerequisites '
                  className='form-control'
                  value={prerequisites}
                  readOnly
                />
              </div>
                 <button type='button' className='btn btn-success' onClick={navigate}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleCourseComponent