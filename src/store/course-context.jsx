import { useState, createContext } from "react";
import { mockedCoursesList } from "../constants";
import { mockedAuthorsList } from "../constants";

const CourseContext = createContext({
  courses: [],
  authors: [],
  addAuthor: (newAuthor) => {},
  showFormStatus: false,
  showAddCourseForm: () => {},
  addCourse: (newCourse) => {},
  emptySearchedInput: (searchedCourse) => {},
  showSearchedCourses: (searchedCourse) => {},
});

export const CoursesContextProvider = (props) => {
  const [courses, setCourses] = useState(mockedCoursesList);
  const [authors, setAuthors] = useState(mockedAuthorsList);
  //const [selectedAuthors, setSelectedAuthors] = useState(mockedAuthorsList);
  const [showAddCourseForm, setShowAddCourseForm] = useState(false);
  const [searchedActivate, setSearchedActivate] = useState(false);
  const [searchedCourses, setSearchedCourses] = useState(courses);

  const showAddCourseHandler = () => {
    setShowAddCourseForm((prevState) => !prevState);
  };

  const addCourseHandler = (newCourse) => {
    setCourses((prevState) =>
      prevState.concat({ ...newCourse, id: String(Math.random()) })
    );
    setShowAddCourseForm(false);
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
    showFormStatus: showAddCourseForm,
    showAddCourseForm: showAddCourseHandler,
    addCourse: addCourseHandler,
    emptySearchedInput: emptySearchedInputHandler,
    showSearchedCourses: searchedCoursesHandler,
  };

  return (
    <CourseContext.Provider value={context}>
      {props.children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
