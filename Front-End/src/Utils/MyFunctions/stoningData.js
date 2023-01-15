const stoningData = (StingData, CreateOrUpdate) => {
  try {
    const data = StingData.split("T")[0].split("-");
    return `${CreateOrUpdate}${data[2]}/${data[1]}/${data[0]}`;
  } catch (err) {
    console.log(err);
  }
};
export default stoningData;
