import axios from "axios"
const REST_API_BASE_URL='http://localhost:8080/api/courses';
const REST_API_BASE_URL_INSTANCE='http://localhost:8080/instance/instances';
const REST_API_BASE_URL_FOR_POST='http://localhost:8080/api/add-courses';
const PREREQUISITES='http://localhost:8080/api/prerequisites';
const INSTANCE_COURSE_ID='http://localhost:8080/instance/getCourseId';
const SAVE_INSTANCE='http://localhost:8080/instance/add-instances';
export const listCourse=()=>{
    return axios.get(REST_API_BASE_URL);
}

export const addCourse=(course)=>{
    return axios.post(REST_API_BASE_URL_FOR_POST,course);
}

export const deleteCourse=(courseId)=>{
    return axios.delete(REST_API_BASE_URL+"/"+courseId);
}

export const getByIdCourse = (courseId) => {
   return axios.get(REST_API_BASE_URL+"/"+courseId);
}

export const getPrerequisites = () => {
   return axios.get(PREREQUISITES);
}

export const listInstance=(year,semester)=>{
    return axios.get(REST_API_BASE_URL_INSTANCE+"/"+year+"/"+semester);
}

export const listInstanceById=(year,semester,courseId)=>{
    return axios.get(REST_API_BASE_URL_INSTANCE+"/"+year+"/"+semester+"/"+courseId);
}

export const getAllCourseId = () => {
   return axios.get(INSTANCE_COURSE_ID);
}

export const saveInstance = (saveObject) => {
   return axios.post(SAVE_INSTANCE,saveObject);
}

export const deleteInstance=(year,semester,courseId)=>{
    return axios.delete(REST_API_BASE_URL_INSTANCE+"/"+year+"/"+semester+"/"+courseId);
}

