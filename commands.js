exports.initCommand = message => {
  return (
    message === "rb" ||
    message === "RB" ||
    message === "Rb" ||
    message === "Ruba"
  );
};

exports.deadlineCommand = message => {
  var commands = ["rb+deadline", "rb+tenggat", "Rb+deadline", "Rb+tenggat"];
  return commands.includes(message);
};

exports.formCommand = message => {
  var commands = ["rb+form", "rb+formulir", "Rb+form", "Rb+formulir"];
  return commands.includes(message);
};

exports.returnCommand = message => {
  var commands = ["rb+return", "rb+balikin", "Rb+return", "Rb+balikin"];
  return commands.includes(message);
};
