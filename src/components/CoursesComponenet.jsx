import React, { useState,useEffect } from 'react';
import { addCourse,getPrerequisites } from '../services/CourseService';
import { useNavigate ,useParams} from 'react-router-dom';

const CoursesComponenet = () => {
  const [courseTitle, setCourseTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [description, setDescription] = useState('');
  const [prerequisites, setPrerequisites] = useState('');
  const navigator = useNavigate();
  const id=useParams();
  
  const [itCourseOptions, setItCourseOptions] = useState([]);

     useEffect(() => {
      getPrerequisites().then(response => {
        setItCourseOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching course prerequisites:', error);
      });
  }, []);



  const saveCourse = (e) => {
    e.preventDefault();
    const course = { courseTitle, courseId, description, prerequisites };
    addCourse(course)
      .then((response) => {
        console.log(response.data);
        alert("✅ Course added successfully!");
        navigator('/courses');
      })
      .catch((error) => {
        alert(`Error: ${error.response?.data || 'Unknown error occurred'}`);
        console.error(error);
      });

  };

  return (
    <div className='container'>
      <br /><br />
      <div className='row'>
        <div className='card col-md-6 offset-md-3'>
             <h2 className='text-center'>Add Course</h2>
          <div className='card-body'>
            <form onSubmit={saveCourse}>
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
                  onChange={(e) => setCourseTitle(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

                    <div className='form-group mb-2'>
                    <label htmlFor='prerequisites'>Prerequisites</label>
                    <select
                      id='prerequisites'
                      name='prerequisites'
                      className='form-control'
                      value={prerequisites}
                      onChange={(e) => setPrerequisites(e.target.value)}
                    >
                      <option value=''>Select a prerequisite</option>
                      {itCourseOptions.map((course, index) => (
                        <option key={index} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type='submit' className='btn btn-success' on>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesComponenet;
