const get_metatag_value = (metatags, key) => {
  const metatag = metatags.find((e) => e.meta_key === key);
  if (metatag) {
    return metatag.meta_value;
  }
  return "";
};

export default get_metatag_value;
