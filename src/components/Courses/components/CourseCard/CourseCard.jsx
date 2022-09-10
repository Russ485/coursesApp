import Button from "../../../../common/Button/Button";
import classes from "./CourseCard.module.css";
import { Link } from "react-router-dom";

const CourseCard = (props) => {
  return (
    <li className={classes.item}>
      <div className={classes.content}>
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className={classes.data}>
        <p>{`Duration: ${props.duration}`}</p>
        <p>{`Created: ${props.creationDate}`}</p>
        <p>{`Authors: ${props.authors}`}</p>
        <Link to={`/courses/${props.id}`}>
          <Button text={"Show Course"} />
        </Link>
      </div>
    </li>
  );
};

export default CourseCard;
