export const pipeDuration = (duration) => {
  let hours = Math.trunc(duration / 60);
  let minutes = duration % 60;

  return `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  } hours`;
};
