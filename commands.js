exports.initCommand = message => {
  return (
    message === "rb" ||
    message === "RB" ||
    message === "Rb" ||
    message === "Ruba"
  );
};
