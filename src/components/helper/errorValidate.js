export const getErrorValidate = (field, errorValidate = []) => {
  const error = errorValidate.filter((err) => err.field === field);

  if (Array.isArray(error) && error.length != 0) {
    return { errorMessage: error[0].message, isError: error[0] != null };
  }
  return { errorMessage: "", isError: false };
};
