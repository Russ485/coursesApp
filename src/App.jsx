import React, { useContext } from "react";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import CourseContext from "./store/course-context";

function App() {
  const courseCtx = useContext(CourseContext);

  return (
    <div>
      <Header />
      {!courseCtx.showFormStatus && <Courses />}
      {courseCtx.showFormStatus && <CreateCourse />}
    </div>
  );
}
export default App;
