import { Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import Header from "./components/Header/Header";
import Courses from "./components/Courses/Courses";
import CreateCourse from "./components/CreateCourse/CreateCourse";
import CourseContext from "./store/course-context";
import CourseInfo from "./components/Courses/components/CourseInfo/CourseInfo";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";

function App() {
  const courseCtx = useContext(CourseContext);

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              replace
              to={courseCtx.isLoggedIn ? "/courses" : "/login"}
            />
          }
        />
        <Route
          path="/courses"
          element={
            courseCtx.isLoggedIn ? (
              <Courses />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            courseCtx.isLoggedIn ? (
              <CourseInfo />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/courses/add"
          element={
            courseCtx.isLoggedIn ? (
              <CreateCourse />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
export default App;
