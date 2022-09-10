import { useState, createContext, useCallback } from "react";
import { mockedCoursesList } from "../constants";
import { mockedAuthorsList } from "../constants";

const CourseContext = createContext({
  courses: [],
  authors: [],
  addAuthor: (newAuthor) => {},
  addCourse: (newCourse) => {},
  emptySearchedInput: (searchedCourse) => {},
  showSearchedCourses: (searchedCourse) => {},
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  userName: "",
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedName = localStorage.getItem("name");
  return { token: storedToken, name: storedName };
};

export const CoursesContextProvider = (props) => {
  const [courses, setCourses] = useState(mockedCoursesList);
  const [authors, setAuthors] = useState(mockedAuthorsList);

  const [searchedActivate, setSearchedActivate] = useState(false);
  const [searchedCourses, setSearchedCourses] = useState(courses);

  const tokenData = retrieveStoredToken();
  const [userName, setUserName] = useState(tokenData.name);

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setUserName("");
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  }, []);

  const loginHandler = (token, name) => {
    setToken(token);
    setUserName(name);
    localStorage.setItem("token", token);
    localStorage.setItem("name", name);
  };

  const addCourseHandler = (newCourse) => {
    setCourses((prevState) =>
      prevState.concat({ ...newCourse, id: String(Math.random()) })
    );
  };

  const addAuthorHandler = (newAuthor) => {
    setAuthors((prevState) => prevState.concat(newAuthor));
  };

  const emptySearchedInputHandler = (searchedCourse) => {
    if (searchedCourse.target.value.length === 0) {
      setSearchedActivate(false);
      setCourses((prevState) => prevState);
    } else {
      return;
    }
  };

  const searchedCoursesHandler = (searchedCourseOrId) => {
    setSearchedActivate(true);
    setSearchedCourses(
      courses.filter(
        (course) =>
          course.title
            .toLowerCase()
            .includes(searchedCourseOrId.toLowerCase()) ||
          course.id.toLowerCase().includes(searchedCourseOrId.toLowerCase())
      )
    );
  };

  const context = {
    courses: searchedActivate ? searchedCourses : courses,
    authors: authors,
    addAuthor: addAuthorHandler,
    addCourse: addCourseHandler,
    emptySearchedInput: emptySearchedInputHandler,
    showSearchedCourses: searchedCoursesHandler,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userName: userName,
  };

  return (
    <CourseContext.Provider value={context}>
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
