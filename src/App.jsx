import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HelloWorld from './HelloWorld';
import CourseList from './components/CourseList';
import{BrowserRouter, Route, Routes} from 'react-router-dom'
import CoursesComponenet from './components/CoursesComponenet';
import SingleCourseComponent from './components/SingleCourseComponent';
import InstanceList from './components/InstanceList';
import Instance from './components/Instance';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CourseList></CourseList>}> </Route>
        <Route path='/courses' element={<CourseList></CourseList>}></Route>
        <Route path='/add-courses' element={<CoursesComponenet></CoursesComponenet>}></Route>
        <Route path='/courses/:id' element={<SingleCourseComponent></SingleCourseComponent>}></Route>
        <Route path='/instances' element={<Instance></Instance>}></Route>
        <Route path='/add-instances' element={<InstanceList></InstanceList>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
