import postsData from "/public/postsData.json";
export default (req, res) => {
  res.status(200).json(postsData);
};
