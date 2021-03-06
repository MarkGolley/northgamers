const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const toBeSortedBy = require("jest-sorted");

beforeEach(() => seed(testData));
afterAll(() => {
  return db.end();
});

describe("/api/categories", () => {
  it("status 200: returns with array object of all categories data", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories.length).toBe(4);
        expect(body.categories[0]).toEqual(
          expect.objectContaining({
            slug: expect.any(String),
            description: expect.any(String),
          })
        );
        expect(Array.isArray(body.categories)).toBe(true);
      });
  });
  it("status 201: returns with an object of the newly added category", () => {
    return request(app)
      .post("/api/categories")
      .send({
        slug: "comedy",
        description: "a funny old game",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.category.length).toBe(1);
        expect(body.category[0]).toEqual({
          slug: "comedy",
          description: "a funny old game",
        });
      });
  });
});

describe("/api/reviews", () => {
  it("status 201: returns with array object of the newly added review", () => {
    return request(app)
      .post("/api/reviews")
      .send({
        owner: "bainesface",
        title: "I loved this game",
        review_body: "OMG what a game",
        designer: "Mr Game Game",
        category: "dexterity",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.review.length).toBe(1);
        expect(body.review[0]).toEqual(
          expect.objectContaining({
            owner: "bainesface",
            title: "I loved this game",
            review_body: "OMG what a game",
            review_id: 14,
            review_img_url:
              "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
            designer: "Mr Game Game",
            category: "dexterity",
            votes: 0,
            created_at: expect.any(String),
            comment_count: "0",
          })
        );
      });
  });
});

describe("/api/reviews/:review_id", () => {
  it("status 200: returns with an object of the specific review data", () => {
    return request(app)
      .get("/api/reviews/1")
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(
          expect.objectContaining({
            owner: "mallionaire",
            title: "Agricola",
            review_id: 1,
            review_body: "Farmyard fun!",
            designer: "Uwe Rosenberg",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            category: "euro game",
            created_at: "2021-01-18T10:00:20.514Z",
            votes: 1,
            comment_count: "0",
          })
        );
      });
  });
  it("status 204: returns the updated review when a valid review is input via patch", () => {
    return request(app)
      .patch("/api/reviews/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        expect(body.review).toEqual(
          expect.objectContaining({
            owner: "mallionaire",
            title: "Agricola",
            review_id: 1,
            review_body: "Farmyard fun!",
            designer: "Uwe Rosenberg",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            category: "euro game",
            created_at: "2021-01-18T10:00:20.514Z",
            votes: 2,
          })
        );
      });
  });
  it("status 204: deletes the review and returns nothing", () => {
    return request(app)
      .delete("/api/reviews/1")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
});

describe("/api/reviews/?query", () => {
  it.skip("status 200: returns with a sorted by title object", () => {
    return request(app)
      .get("/api/reviews?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews).toBeSortedBy("title");
      });
  });
  it("status 200: returns with a sorted by owner object", () => {
    return request(app)
      .get("/api/reviews?sort_by=owner")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews).toBeSortedBy("owner");
      });
  });
  it("status 200: returns with a sorted by review_id object", () => {
    return request(app)
      .get("/api/reviews?sort_by=review_id")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews).toBeSortedBy("review_id");
      });
  });
  it("status 200: returns with a sorted by review_img_url object", () => {
    return request(app)
      .get("/api/reviews?sort_by=review_img_url")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews).toBeSortedBy("review_img_url");
      });
  });
  it("status 200: returns with a sorted by votes object", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews).toBeSortedBy("votes");
      });
  });
  it("status 200: returns with a sorted by category object", () => {
    return request(app)
      .get("/api/reviews?sort_by=category")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews).toBeSortedBy("category");
      });
  });
  it("status 200: returns with a sorted by created_at object", () => {
    return request(app)
      .get("/api/reviews?sort_by=created_at")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews).toBeSortedBy("created_at");
      });
  });
  it("status 200: returns with an ordered by descending object", () => {
    return request(app)
      .get("/api/reviews?order_by=DESC")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews).toBeSortedBy("title", { descending: true });
      });
  });
  it("status 200: returns with a filtered by category=dexterity object", () => {
    return request(app)
      .get("/api/reviews?category=dexterity")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(1);
        expect(body.reviews[0]).toEqual(
          expect.objectContaining({
            category: "dexterity",
            comment_count: "3",
            created_at: "2021-01-18T10:01:41.251Z",
            owner: "philippaclaire9",
            review_id: 2,
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            title: "Jenga",
            votes: 5,
          })
        );
      });
  });
  it("status 200: returns with a filtered by category=social deduction object", () => {
    return request(app)
      .get("/api/reviews?category=social deduction")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews[0]).toEqual(
          expect.objectContaining({
            category: "social deduction",
            comment_count: "0",
            created_at: "2021-01-18T10:01:41.251Z",
            owner: "mallionaire",
            review_id: 9,
            review_img_url:
              "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
            title: "A truly Quacking Game; Quacks of Quedlinburg",
            total_count: "3",
            votes: 10,
          })
        );
      });
  });
  it("status 200: returns with a filtered by category=euro game object", () => {
    return request(app)
      .get("/api/reviews?category=euro game")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(1);
        expect(body.reviews[0]).toEqual(
          expect.objectContaining({
            category: "euro game",
            comment_count: "0",
            created_at: "2021-01-18T10:00:20.514Z",
            owner: "mallionaire",
            review_id: 1,
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            title: "Agricola",
            total_count: "3",
            votes: 1,
          })
        );
      });
  });
  it("status 200: returns with a filtered by category=strategy object", () => {
    return request(app)
      .get("/api/reviews?category=strategy")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(0);
        expect(body.reviews[0]).toEqual(expect.objectContaining({}));
      });
  });
  it("status 200: returns with a filtered by category=children's games object", () => {
    return request(app)
      .get("/api/reviews?category=children''s games")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(0);
        expect(body.reviews[0]).toEqual(expect.objectContaining({}));
      });
  });
  it("status 200: returns with a filtered, sorted and ordered object of the specific review data", () => {
    return request(app)
      .get("/api/reviews?sort_by=designer&&order_by=DESC&&category=dexterity")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(1);
        expect(body.reviews[0]).toEqual(
          expect.objectContaining({
            category: "dexterity",
            comment_count: "3",
            created_at: "2021-01-18T10:01:41.251Z",
            owner: "philippaclaire9",
            review_id: 2,
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            title: "Jenga",
            votes: 5,
          })
        );
      });
  });
  it("status 200: returns with a filtered, sorted, ordered, limited and paged object of the specific review data", () => {
    return request(app)
      .get(
        "/api/reviews?sort_by=designer&&order_by=DESC&&category=dexterity&&limit=10&&p=0"
      )
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(1);
        expect(body.reviews[0]).toEqual(
          expect.objectContaining({
            category: "dexterity",
            comment_count: "3",
            created_at: "2021-01-18T10:01:41.251Z",
            owner: "philippaclaire9",
            review_id: 2,
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            title: "Jenga",
            votes: 5,
          })
        );
      });
  });
  it.skip("status 200: returns with a standard default query object, when no query is supplied, of the specific review data", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(10);
        expect(body.reviews[0]).toEqual(
          expect.objectContaining({
            category: "social deduction",
            comment_count: "0",
            created_at: "2021-01-18T10:01:41.251Z",
            owner: "mallionaire",
            review_id: 9,
            review_img_url:
              "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
            title: "A truly Quacking Game; Quacks of Quedlinburg",
            votes: 10,
          })
        );
      });
  });
  it.skip("status 200: returns page 2 of a default query object, when limit is 10 and page is 1, of the specific review data", () => {
    return request(app)
      .get("/api/reviews?limit=10&&p=1")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(3);
        expect(body.reviews[0]).toEqual(
          expect.objectContaining({
            category: "social deduction",
            comment_count: "0",
            created_at: "1970-01-10T02:08:38.400Z",
            owner: "mallionaire",
            review_id: 13,
            review_img_url:
              "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
            title: "Settlers of Catan: Don't Settle For Less",
            votes: 16,
            total_count: "3",
          })
        );
      });
  });
});

describe("/api/reviews/:review_id/comments", () => {
  it("status 200: returns with an object of the specific review data", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments.length).toBe(3);
        expect(body.comments[0]).toEqual(
          {
            author: "bainesface",
            body: "I loved this game too!",
            comment_id: 1,
            created_at: "2017-11-22T12:43:33.389Z",
            total_count: "-4",
            votes: 16,
          },
          {
            author: "bainesface",
            body: "EPIC board game!",
            comment_id: 4,
            created_at: "2017-11-22T12:36:03.389Z",
            total_count: "-4",
            votes: 16,
          },
          {
            author: "mallionaire",
            body: "Now this is a story all about how, board games turned my life upside down",
            comment_id: 5,
            created_at: "2021-01-18T10:24:05.410Z",
            total_count: "-4",
            votes: 13,
          }
        );
      });
  });
  it("status 200: returns with the added object for the comment that was added", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "bainesface", body: "I really loved this game!" })
      .expect(200)
      .then(({ body }) => {
        expect(body.comment.length).toBe(1);
        expect(body.comment).toEqual(
          expect.objectContaining([
            {
              author: "bainesface",
              body: "I really loved this game!",
              comment_id: 7,
              created_at: expect.any(String),
              review_id: 2,
              votes: 0,
            },
          ])
        );
      });
  });
});

describe("/api/comments/:comment_id", () => {
  it("status 204: deletes a comment by comment Id", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
});

describe("/api", () => {
  it("status 200: responds with the available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((body) => {
        expect(body.body).toEqual({
          endpoints: {
            "GET /api": {
              description:
                "serves up a json representation of all the available endpoints of the api",
            },
            "GET /api/categories": {
              description: "serves an array of all categories",
              queries: [],
              exampleResponse: {
                categories: [
                  {
                    description:
                      "Players attempt to uncover each other's hidden role",
                    slug: "Social deduction",
                  },
                ],
              },
            },
            "POST /api/categories": {
              description: "posts a new category",
              body: { slug: "xxx", description: "xxx" },
              queries: [],
              exampleResponse: {
                categories: [
                  {
                    description:
                      "Players attempt to uncover each other's hidden role",
                    slug: "Social deduction",
                  },
                ],
              },
            },
            "GET /api/reviews": {
              description: "serves an array of all reviews",
              queries: ["category", "sort_by", "order"],
              exampleResponse: {
                reviews: [
                  {
                    title: "One Night Ultimate Werewolf",
                    designer: "Akihisa Okui",
                    owner: "happyamy2016",
                    review_img_url:
                      "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    category: "hidden-roles",
                    created_at: 1610964101251,
                    votes: 5,
                  },
                ],
              },
            },
            "PATCH /api/reviews": {
              description:
                "allows an update of the votes property to be made to a review",
              queries: [],
              exampleResponse: {
                "review:": [
                  {
                    owner: "mallionaire",
                    title: "Agricola",
                    review_id: 1,
                    review_body: "Farmyard fun!",
                    designer: "Uwe Rosenberg",
                    review_img_url:
                      "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    category: "euro game",
                    created_at: "2021-01-18T10:00:20.514Z",
                    votes: 2,
                  },
                ],
              },
            },
            "GET /api/reviews/:review_id": {
              description: "serves an array of reviews by review_id",
              queries: [],
              exampleResponse: {
                reviews: [
                  {
                    owner: "mallionaire",
                    title: "Agricola",
                    review_id: 1,
                    review_body: "Farmyard fun!",
                    designer: "Uwe Rosenberg",
                    review_img_url:
                      "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    category: "euro game",
                    created_at: "2021-01-18T10:00:20.514Z",
                    votes: 1,
                    comment_count: "0",
                  },
                ],
              },
            },
            "GET /api/reviews/:review_id/comments": {
              description:
                "serves an array of comments on a review by review_id",
              queries: [],
              exampleResponse: {
                comments: [
                  {
                    author: "bainesface",
                    body: "I loved this game too!",
                    comment_id: 1,
                    created_at: "2017-11-22T12:43:33.389Z",
                    votes: 16,
                  },
                  {
                    author: "bainesface",
                    body: "EPIC board game!",
                    comment_id: 4,
                    created_at: "2017-11-22T12:36:03.389Z",
                    votes: 16,
                  },
                  {
                    author: "mallionaire",
                    body: "Now this is a story all about how, board games turned my life upside down",
                    comment_id: 5,
                    created_at: "2021-01-18T10:24:05.410Z",
                    votes: 13,
                  },
                ],
              },
            },
            "POST /api/reviews/:review_id/comments": {
              description: "post a new comment to a review by review_id",
              queries: [],
              exampleResponse: {
                comment: [
                  {
                    author: "bainesface",
                    body: "I really loved this game!",
                    comment_id: 7,
                    created_at: "2017-11-22T12:36:03.389Z",
                    review_id: 2,
                    votes: 0,
                  },
                ],
              },
            },
            "POST /api/reviews": {
              description: "post a new review",
              queries: [],
              exampleResponse: {
                review: [
                  {
                    owner: "mallionaire",
                    title: "Agricola",
                    review_id: 1,
                    review_body: "Farmyard fun!",
                    designer: "Uwe Rosenberg",
                    review_img_url:
                      "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                    category: "euro game",
                    created_at: "2021-01-18T10:00:20.514Z",
                    votes: 1,
                    comment_count: "0",
                  },
                ],
              },
            },
            "DELETE /api/reviews/:review_id": {
              description: "delete a review by review_id",
              queries: [],
              exampleResponse: {},
            },
            "DELETE /api/comments/:comment_id": {
              description: "delete a comment by comment_id",
              queries: [],
            },
            "PATCH /api/comments/comment_id": {
              description:
                "allows an update of the votes property to be made to a comment",
              queries: [],
              exampleResponse: {
                "comment:": [
                  {
                    comment_id: "1",
                    author: "Sample",
                    review_id: 1,
                    created_at: "2021-01-18T10:00:20.514Z",
                    votes: 2,
                  },
                ],
              },
            },
            "GET /api/users": {
              description: "returns all users in an array",
              queries: [],
              exampleResponse: {
                comment: [
                  {
                    avatar_url:
                      "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                    name: "haz",
                    username: "mallionaire",
                  },
                  {
                    avatar_url:
                      "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
                    name: "philippa",
                    username: "philippaclaire9",
                  },
                ],
              },
            },
            "GET /api/users/:username": {
              description: "returns a specific user details",
              queries: [],
              exampleResponse: {
                comment: [
                  {
                    avatar_url:
                      "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                    name: "haz",
                    username: "mallionaire",
                  },
                ],
              },
            },
          },
        });
      });
  });
});

describe("/api/users", () => {
  it("status 200: returns an array of objects of username", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          users: [
            {
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
              name: "haz",
              username: "mallionaire",
            },
            {
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
              name: "philippa",
              username: "philippaclaire9",
            },
            {
              avatar_url:
                "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
              name: "sarah",
              username: "bainesface",
            },
            {
              avatar_url:
                "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
              name: "dave",
              username: "dav3rid",
            },
          ],
        });
      });
  });
});

describe("/api/users/:username", () => {
  it("status 200: returns an object of username", () => {
    return request(app)
      .get("/api/users/mallionaire")
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          user: [
            {
              avatar_url:
                "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
              name: "haz",
              username: "mallionaire",
            },
          ],
        });
      });
  });
});

describe("/api/comments/:comment_id", () => {
  it("status 200: returns an updated comment object", () => {
    return request(app)
      .patch("/api/comments/2")
      .send({ inc_votes: 3 })
      .expect(200)
      .then(({ body }) => {
        expect(body).toEqual({
          comment: [
            {
              author: "mallionaire",
              body: "My dog loved this game too!",
              comment_id: 2,
              created_at: "2021-01-18T10:09:05.410Z",
              review_id: 3,
              votes: 16,
            },
          ],
        });
      });
  });
});

describe("error handling testing", () => {
  it("status 404: returns an error when an review_id doesn't exist", () => {
    return request(app)
      .get("/api/reviews/10900")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, review_id not found!" });
      });
  });
  it("status 400: returns an error when an invalid review_id format is input", () => {
    return request(app)
      .get("/api/reviews/dogs")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, id not a valid input!" });
      });
  });
  it("status 400: returns an error when an invalid sort_by query is input", () => {
    return request(app)
      .get("/api/reviews?sort_by=bananas")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Invalid sort_by chosen" });
      });
  });
  it("status 400: returns an error when an invalid order_by query is input", () => {
    return request(app)
      .get("/api/reviews?order_by=bananas")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Invalid order_by chosen" });
      });
  });
  it("status 400: returns an error when an invalid category query is input", () => {
    return request(app)
      .get("/api/reviews?category=bananas")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Invalid category chosen" });
      });
  });
  it("status 400: returns an error if invalid username is provided", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "markeywarkey", body: "I really loved this game!" })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, bad input data!" });
      });
  });
  it("status 400: returns an error if empty post request made", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, bad input data!" });
      });
  });
  it("status 400: returns an error when an review_id doesn't exist", () => {
    return request(app)
      .post("/api/reviews/19000/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, bad input data!" });
      });
  });
  it("status 400: returns an error when an invalid review_id format is input", () => {
    return request(app)
      .post("/api/reviews/dogs/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, id not a valid input!" });
      });
  });
  it("status 400: returns an error as wrong address typed in", () => {
    return request(app)
      .get("/api/user")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  it("status 404: returns an error when an invalid comment format is input", () => {
    return request(app)
      .delete("/api/comments/dogs")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, id not a valid input!" });
      });
  });
  it("status 404: returns an error of invalid user id", () => {
    return request(app)
      .get("/api/users/markeywarkey")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Sorry, username not found!",
        });
      });
  });
  it("status 400: returns an error of username invalid format", () => {
    return request(app)
      .get("/api/users/true")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Sorry, username not found!",
        });
      });
  });
  it("status 204: deletes a comment by comment Id", () => {
    return request(app).delete("/api/comments/10").expect(404);
  });
  it("status 404: returns an error of invalid comment_id", () => {
    return request(app)
      .patch("/api/comments/24554")
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Sorry, comment_id not found!",
        });
      });
  });
  it("status 400: returns an error of comment_id invalid format", () => {
    return request(app)
      .patch("/api/comments/dog")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({
          msg: "Sorry, id not a valid input!",
        });
      });
  });
});
