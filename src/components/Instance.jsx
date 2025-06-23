import React, { useEffect, useState } from 'react';
import { deleteInstance, getAllCourseId, listInstance, listInstanceById } from '../services/CourseService';
import { useNavigate } from 'react-router-dom';

const Instance = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [courseId, setCourseId] = useState('');
  const [course,setCourse]=useState('');
  const navigator=useNavigate();
  const [instanceByYearAndSemester, setInstanceByYearAndSemester] = useState([]);
  const [instanceByYearAndSemesterAndId, setInstanceByYearAndSemesterAndId] = useState('');
  const [courseIdOptions, setCourseIdOptions] = useState([]);

  useEffect(() => {
    getAllCourseId()
      .then((response) => {
        setCourseIdOptions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching course IDs:', error);
      });
  }, []);

  function getInstane(e) {
    e.preventDefault();
    setInstanceByYearAndSemester([]);
    setInstanceByYearAndSemesterAndId(null);

    if (!courseId) {
      listInstance(year, semester)
        .then((response) => {
          setInstanceByYearAndSemester(response.data);
        })
        .catch((error) => {
          alert(`❌ Error: ${error.response?.data || 'Unknown error occurred'}`);
          console.error(error);
        });
    } else {
      listInstanceById(year, semester, courseId)
        .then((response) => {
          setInstanceByYearAndSemesterAndId(response.data);
        })
        .catch((error) => {
          alert(`❌ Error: ${error.response?.data || 'Unknown error occurred'}`);
          console.error(error);
        });
    }
  }


  function toAddComponent(){
    navigator('/add-instances')
  }
  
  const removeInstance = (year,semester,courseId) => {
        deleteInstance(year,semester,courseId).then((response)=>{
           console.log(response.data);
        alert(" Instance deleted successfully!");
        
      })
      .catch((error) => {
        alert(`Error: ${error.response?.data || 'Unknown error occurred'}`);
        console.error(error);
      });
      window.location.reload();
  };

function toCourse(){
  navigator('/courses')
}

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Instance</h2>
          <div className="card-body">
            <form onSubmit={getInstane}>
              <div className="form-group mb-2">
                <label htmlFor="year">Select Year:</label>
                <select id="year" name="year" value={year} onChange={(e) => setYear(e.target.value)} className="form-control">
                  <option value="">-- Select Year --</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="semester">Select Semester:</label>
                <select id="semester" name="semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="form-control">
                  <option value="">-- Select Semester --</option>
                  <option value="SEM 1">Semester 1</option>
                  <option value="SEM 2">Semester 2</option>
                  <option value="SEM 3">Semester 3</option>
                  <option value="SEM 4">Semester 4</option>
                  <option value="SEM 5">Semester 5</option>
                  <option value="SEM 6">Semester 6</option>
                </select>
              </div>

              <div className="form-group mb-2">
                <label htmlFor="courseId">Select CourseId:</label>
                <select
                  id="courseId"
                  name="courseId"
                  className="form-control"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  <option value="">Select a CourseId</option>
                  {courseIdOptions.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-success">Save</button>
            </form>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className="container">
        <h2 className="text-center">List Of Instances</h2>
        <button className="btn btn-primary mb-2" onClick={toAddComponent}>Add Instance</button>
        <button className="btn btn-primary mb-2" onClick={toCourse}>Add Course</button>
    
        {instanceByYearAndSemester.length > 0 && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Course Id</th>
                <th>Year</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {instanceByYearAndSemester.map((item, index) => (
                <tr key={index}>
                  <td>{item.courseId}</td>
                  <td>{item.year}</td>
                  <td>{item.semester}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => removeInstance(item.year,item.semester,item.courseId)}>Delete</button>{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

    
{instanceByYearAndSemesterAndId && (
  <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Course Id</th>
        <th>Year</th>
        <th>Semester</th>
        <th>Course Name</th>
        <th>Description</th>
        <th>Prerequisites</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
    
        <tr>
          <td>{instanceByYearAndSemesterAndId.courseId}</td>
          <td>{instanceByYearAndSemesterAndId.year}</td>
          <td>{instanceByYearAndSemesterAndId.semester}</td>
          <td>{instanceByYearAndSemesterAndId.course?.courseTitle}</td>
          <td>{instanceByYearAndSemesterAndId.course?.description}</td>
          <td>{instanceByYearAndSemesterAndId.course?.prerequisites}</td>
          <td>
            <button className="btn btn-danger" onClick={() => removeInstance(item.year,item.semester,item.courseId)}>Delete</button>{' '}

          </td>
        </tr>
      
    </tbody>
  </table>
)}

      </div>
    </div>
  );
};

export default Instance;
