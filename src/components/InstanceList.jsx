import React, { useState } from 'react'
import { saveInstance } from '../services/CourseService';
import { useNavigate } from 'react-router-dom';

const InstanceList = () => {
    const [year,setYear]=useState('');
    const [semester,setSemester]=useState('')
    const [courseId,setCourseId]=useState('')
    const navigator=useNavigate();
    function saveCourse(e){
        e.preventDefault();
            const saveObject={year,semester,courseId}
            saveInstance(saveObject).then((response)=>{
                console.log(response.data);
                alert("✅ Course added successfully!");
                navigator('/instances');
            }).catch((error) => {
        alert(` Error: ${error.response?.data || 'Unknown error occurred'}`);
        console.error(error);
      });
    }
  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
             <h2 className='text-center'>Add Instance</h2>
          <div className='card-body'>
            <form onSubmit={saveCourse}>
              <div className='form-group mb-2'>
                <label htmlFor='Year'>Instance Year</label>
                <input
                  type='number'
                  id='year'
                  name='year'
                  placeholder='year'
                  required
                  className='form-control'
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              
              <div className='form-group mb-2'>
                <label htmlFor='description'>Semester</label>
                <input
                  type='text'
                  id='semester'
                  name='semester'
                  placeholder='Course semester'
                  required
                  className='form-control'
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
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
                  onChange={(e) => setCourseId(e.target.value)}
                />
              </div>
                  <button type='submit' className='btn btn-success'>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstanceList