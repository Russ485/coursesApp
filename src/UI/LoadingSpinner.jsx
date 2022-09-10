import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={classes.spinnerBox}>
      <div className={classes.pulseContainer}>
        <div className={`${classes.pulseBubble} ${classes.pulseBubble1}`}></div>
        <div className={`${classes.pulseBubble} ${classes.pulseBubble2}`}></div>
        <div className={`${classes.pulseBubble} ${classes.pulseBubble3}`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
