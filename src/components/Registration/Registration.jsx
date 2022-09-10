import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import classes from "./Registration.module.css";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState("");

  const navigate = useNavigate();

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function showModalHandler() {
    setShowModal(true);
  }

  function closeModalHandler() {
    setShowModal(false);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);

    if (enteredName.trim().length === 0) {
      setIsLoading(false);
      showModalHandler();
      setModalText("Please, fill your name");
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBloUzhqBhQyFwmsQyJvn2f9AXmsxaLZPI",
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
              let errorMessage = "Registration failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          //console.log(data);
          fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBloUzhqBhQyFwmsQyJvn2f9AXmsxaLZPI",
            {
              method: "POST",
              body: JSON.stringify({
                idToken: data.idToken,
                displayName: enteredName,
                photoUrl: null,
                returnSecureToken: true,
              }),
              headers: { "Content-Type": "application/json" },
            }
          ).then(async (res) => await res.json());

          setIsSuccess(true);
          setTimeout(() => {
            setIsSuccess(false);
            navigate("../login", { replace: true });
          }, 2000);
        })
        .catch((err) => {
          showModalHandler();
          setModalText(err.message);
        });
    }
  };

  return (
    <section className={classes.auth}>
      <h1>Registration</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <Input
            placeholder="Enter name"
            type="text"
            id="name"
            required
            ref={nameInputRef}
          />
        </div>
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
          <Button text="Registration" />
        </div>
        <div>
          {isLoading ? (
            <LoadingSpinner />
          ) : !isSuccess ? (
            <p className={classes.link}>
              If You have an account you can <Link to={"/login"}>Login</Link>
            </p>
          ) : (
            <div className={classes.wrapper}>
              {" "}
              <svg
                className={classes.checkmark}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 52 52"
              >
                {" "}
                <circle
                  className={classes.checkmarkCircle}
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />{" "}
                <path
                  className={classes.checkmarkCheck}
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              </svg>
            </div>
          )}
        </div>
      </form>
      {showModal && <Modal text={modalText} onClick={closeModalHandler} />}
    </section>
  );
};

export default Register;
