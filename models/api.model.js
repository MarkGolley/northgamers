exports.fetchAPIs = () => {
  console.log("in api model");
  return Promise.resolve([
    {
      path: "/api/categories",
    },
    {
      path: "/api/reviews/:review_id",
    },
    {
      path: "/api/reviews",
    },
    {
      path: "/api/reviews/:review_id/comments",
    },
    {
      path: "/api/comments/:comment_id",
    },
    { path: "/api" },
  ]);
};
