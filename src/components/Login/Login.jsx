import { useRef, useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CourseContext from "../../store/course-context";
import classes from "./Login.module.css";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const courseCtx = useContext(CourseContext);

  function showModalHandler() {
    setShowModal(true);
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBloUzhqBhQyFwmsQyJvn2f9AXmsxaLZPI",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(async (res) => {
        setIsLoading(false);
        if (res.ok) {
          return await res.json();
        } else {
          return await res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        courseCtx.login(data.idToken, data.displayName);
        navigate("../courses", { replace: true });
      })
      .catch((err) => {
        showModalHandler();
        setModalText(err.message);
      });
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <Input
            placeholder="Enter email"
            type="email"
            id="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <Input
            placeholder="Enter password"
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <Button text="Login" />
        </div>
        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <p className={classes.link}>
              If You not have an account you can{" "}
              <Link to={"/registration"}>Registration</Link>
            </p>
          )}
        </div>
      </form>
      {showModal && <Modal text={modalText} onClick={closeModalHandler} />}
    </section>
  );
};

export default Login;
