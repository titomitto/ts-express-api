import chalk from "chalk";

const exceptionHandler = (err, req, res, next) => {
  // Handle the exception handling
  console.log(chalk.red("WE GOT A NEW ERROR"));
  console.error(err);
  res.status(500).json({
    success: false,
    message: "We got an error",
    error: err.stack
  });
};

export default exceptionHandler;
