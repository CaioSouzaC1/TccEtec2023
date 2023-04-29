const getYoutubeId = (url) => {
  const youtube_regex =
    /^.*(youtu\.be\/|vi?\/|u\/\w\/|embed\/|\?vi?=|\&vi?=)([^#\&\?]*).*/;
  const match = url.match(youtube_regex);
  return match ? match[2] : false;
};
export default getYoutubeId;
