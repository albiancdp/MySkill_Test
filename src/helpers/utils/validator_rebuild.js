const validate = (errors) => {

  const extractedErrors = {};
  errors.map(err => [
    extractedErrors[err.path] = err.errors
  ]);

  return extractedErrors;

};

export default validate;
