import React, { useRef, useContext } from "react";
import Input from "../../../../common/Input/Input";
import Button from "../../../../common/Button/Button";
import classes from "./SearchBar.module.css";
import CourseContext from "../../../../store/course-context";

const SearchBar = (props) => {
  const courseCtx = useContext(CourseContext);
  const searchRef = useRef();

  const renderSearchedCourses = () => {
    courseCtx.showSearchedCourses(searchRef.current.value);
  };

  return (
    <div className={classes.container}>
      <Input
        id={"search"}
        ref={searchRef}
        placeholder={"Enter Course Name"}
        onChange={courseCtx.emptySearchedInput}
      />
      <Button text={"Search"} onClick={renderSearchedCourses} />
    </div>
  );
};

export default SearchBar;
