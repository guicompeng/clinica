
const isValidDate = (value) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(value);
  };
  
module.exports = {
    isValidDate,
};