import React, { useContext } from "react";
import { Logo } from "./components/Logo/Logo";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import Button from "../../common/Button/Button";
import CourseContext from "../../store/course-context";

const Header = () => {
  const courseCtx = useContext(CourseContext);
  return (
    <div>
      <header className={styles.header}>
        <Link to={"/courses"}>
          <Logo />
        </Link>
        <nav>
          <ul>
            <li>{courseCtx.userName}</li>
            {courseCtx.isLoggedIn ? (
              <li>
                <Button text={"Logout"} onClick={courseCtx.logout} />
              </li>
            ) : null}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
