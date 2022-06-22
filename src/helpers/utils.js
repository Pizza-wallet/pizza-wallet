export const validateEmail = (email) => {
  // This can be improved upon in future
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
};
