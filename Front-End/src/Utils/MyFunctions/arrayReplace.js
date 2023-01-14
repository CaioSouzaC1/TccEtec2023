const arrayReplace = (array, replacer, content) => {
  let contentString = content;
  array.forEach((e) => {
    contentString = contentString.replace(e, replacer);
  });
  return contentString;
};

export default arrayReplace;
