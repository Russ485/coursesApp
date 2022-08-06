import React, { useContext } from "react";
import CourseCard from "./components/CourseCard/CourseCard";
import classes from "./Courses.module.css";
import SearchBar from "./components/SearchBar/SearchBar";
import Button from "../../common/Button/Button";
import CourseContext from "../../store/course-context";
import { pipeDuration } from "../../helpers/pipeDuration";

const Courses = (props) => {
  const coursesCtx = useContext(CourseContext);
  const courses = coursesCtx.courses;
  const authors = coursesCtx.authors;

  const authorIdHandler = (arrayOfId) => {
    let newArr = [];
    for (const author of authors) {
      if (arrayOfId.some((id) => id === author.id)) {
        newArr.push(author.name);
      }
    }
    return newArr;
  };

  return (
    <React.Fragment>
      <section className={classes.container}>
        <SearchBar />
        <Button
          text={"Add new Course"}
          onClick={coursesCtx.showAddCourseForm}
        />
      </section>
      <ul className={classes.list}>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            title={course.title}
            description={course.description}
            duration={pipeDuration(course.duration)}
            creationDate={course.creationDate}
            authors={authorIdHandler(course.authors)}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default Courses;
