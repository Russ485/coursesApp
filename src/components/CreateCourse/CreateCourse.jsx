import classes from "./CreateCourse.module.css";
import { useState, useRef, useContext } from "react";
import Button from "../../common/Button/Button";
import CourseContext from "../../store/course-context";
import { dateGenerator } from "../../helpers/dateGenerator";
import { pipeDuration } from "../../helpers/pipeDuration";
import Input from "../../common/Input/Input";

const CreateCourse = (props) => {
  const [courseAuthorsId, setCourseAuthorsId] = useState([]);
  const [selectedCourseAuthors, setSelectedCourseAuthors] = useState([]);
  const [duration, setDuration] = useState("00:00 hours");
  const [addAuthorInput, setAddAuthorInput] = useState("");

  const courseCtx = useContext(CourseContext);
  const [authors, setAuthors] = useState(courseCtx.authors);

  const titleInputRef = useRef();
  const durationInputRef = useRef();
  const descriptionInputRef = useRef();

  const addAuthorInputRef = useRef();

  const addAuthorInputChangeHandler = (e) => {
    setAddAuthorInput(e.target.value);
  };

  const addAuthorHandler = (author) => {
    if (author.length < 2) {
      alert("Length of author couldn't be less then two characters");
    } else {
      let id = String(Math.random());
      setAuthors((prevState) => prevState.concat({ name: author, id: id }));
      courseCtx.addAuthor({ name: author, id: id });
    }
  };

  const selectAuthorHandler = (author) => {
    setCourseAuthorsId((prevState) => prevState.concat(author.id));

    setAuthors((prevState) => prevState.filter((a) => a.id !== author.id));

    setSelectedCourseAuthors((prevState) => prevState.concat(author));
  };

  const deleteAuthorHandler = (author) => {
    setSelectedCourseAuthors((prevState) =>
      prevState.filter((a) => a.id !== author.id)
    );

    setCourseAuthorsId((prevState) =>
      prevState.filter((authorId) => authorId !== author.id)
    );

    setAuthors((prevState) => prevState.concat(author));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredData = {
      title: titleInputRef.current.value,
      creationDate: dateGenerator(),
      description: descriptionInputRef.current.value,
      duration: durationInputRef.current.value,
    };

    if (
      titleInputRef.current.value.trim().length === 0 ||
      durationInputRef.current.value.trim().length === 0 ||
      descriptionInputRef.current.value.trim().length === 0 ||
      courseAuthorsId.length === 0
    ) {
      alert("Please, fill in all fields");
    } else {
      courseCtx.showAddCourseForm();
      courseCtx.addCourse({
        ...enteredData,
        authors: courseAuthorsId,
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <Input
          label={"Course Title: "}
          ref={titleInputRef}
          type="text"
          id="title"
        />

        <Input
          label={"Duration: "}
          onChange={() =>
            setDuration(pipeDuration(durationInputRef.current.value))
          }
          ref={durationInputRef}
          type="number"
          id="duration"
        />
        <p className={classes.duration}>Duration {duration} </p>

        <label htmlFor="description">Description</label>
        <textarea
          ref={descriptionInputRef}
          rows="5"
          required
          id="description"
        />
      </div>
      <div className={classes.container}>
        <ul className={classes.list}>
          <h2>Authors</h2>
          {authors.map((author) => (
            <li key={author.id} id={author.id}>
              <div className={classes.author}>{author.name}</div>
              <Button
                text={"Add"}
                type={"button"}
                onClick={() => {
                  selectAuthorHandler(author);
                }}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className={classes.control}>
        <Input
          label={"Add New Author: "}
          ref={addAuthorInputRef}
          type="string"
          id="addAuthor"
          value={addAuthorInput}
          onChange={addAuthorInputChangeHandler}
        />
        <Button
          text={"Add New Author"}
          type={"button"}
          onClick={() => {
            addAuthorHandler(addAuthorInputRef.current.value);
            setAddAuthorInput("");
          }}
        />
        <div>
          <Button
            type={"submit"}
            text={"CREATE COURSE"}
            onClick={submitHandler}
          />
        </div>
      </div>
      <div className={classes.container}>
        <ul className={classes.list}>
          <h2>Course Authors</h2>
          {selectedCourseAuthors.length === 0 && (
            <p>You don't add any authors. Please add at least one of them</p>
          )}
          {selectedCourseAuthors.map((author) => (
            <li key={author.id} id={author.id}>
              <div className={classes.author}>{author.name}</div>
              <Button
                text={"Delete"}
                type={"button"}
                onClick={() => deleteAuthorHandler(author)}
              />
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default CreateCourse;
