import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import CourseContext from "../../../../store/course-context";
import Button from "../../../../common/Button/Button";
import classes from "./CourseInfo.module.css";
import { pipeDuration } from "../../../../helpers/pipeDuration";
import { dateGenerator } from "../../../../helpers/dateGenerator";

const CourseInfo = () => {
  const { courseId } = useParams();
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

  const course = courses.find((c) => c.id === courseId);

  return (
    <div className={classes.item}>
      <div className={classes.content}>
        <h3>{course.title}</h3>
        <p>{course.description}</p>
      </div>
      <div className={classes.data}>
        <p>{`ID: ${course.id}`}</p>
        <p>{`Duration: ${pipeDuration(course.duration)}`}</p>
        <p>{`Created: ${dateGenerator(course.creationDate)}`}</p>
        <p>{`Authors: ${authorIdHandler(course.authors)}`}</p>
        <Link to={"/courses"}>
          <Button text={"<<< Back to Courses"} />
        </Link>
      </div>
    </div>
  );
};

export default CourseInfo;
