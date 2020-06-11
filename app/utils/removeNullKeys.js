export default obj => {
  const newObj = { ...obj };
  for (const key in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      const isEmptyString = typeof newObj[key] === 'string' && !newObj[key];
      if (
        typeof newObj[key] === 'undefined' ||
        newObj[key] === null ||
        isEmptyString
      ) {
        delete newObj[key];
      }
    }
  }

  return newObj;
};
