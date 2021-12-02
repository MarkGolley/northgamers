const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("/api/categories", () => {
  it("status 200: returns with array object of all categories data", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then(({ body }) => {
        expect(body.categories.length).toBe(4);
        expect(body.categories[0]).toEqual(
          expect.objectContaining({
            category_id: expect.any(String),
            description: expect.any(String),
          })
        );
        expect(Array.isArray(body.categories)).toBe(true);
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
});

describe("/api/reviews/?query", () => {
  it("status 200: returns with a sorted by title object (When a valid sort_by is input) of the specific review data", () => {
    return request(app)
      .get("/api/reviews?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(13);
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
  it("status 200: returns with a sorted by owner object (When a valid sort_by is input) of the specific review data", () => {
    return request(app)
      .get("/api/reviews?sort_by=owner")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(13);
        expect(body.reviews[0]).toEqual(
          expect.objectContaining({
            category: "social deduction",
            comment_count: "3",
            created_at: "2021-01-18T10:01:41.251Z",
            owner: "bainesface",
            review_id: 3,
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            title: "Ultimate Werewolf",
            votes: 5,
          })
        );
      });
  });
  it("status 200: returns with an ordered by descending object (When a valid order_by is input) of the specific review data", () => {
    return request(app)
      .get("/api/reviews?order_by=DESC")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(13);
        expect(body.reviews[0]).toEqual(
          expect.objectContaining({
            category: "social deduction",
            comment_count: "3",
            created_at: "2021-01-18T10:01:41.251Z",
            owner: "bainesface",
            review_id: 3,
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            title: "Ultimate Werewolf",
            votes: 5,
          })
        );
      });
  });
  it("status 200: returns with a filtered by category object (When a valid category is input) of the specific review data", () => {
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
  it("status 200: returns with a standard default query object, when no query is supplied, of the specific review data", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then(({ body }) => {
        expect(body.reviews.length).toBe(13);
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
  it("status 404: returns an error when an review_id doesn't exist", () => {
    return request(app)
      .get("/api/reviews/450")
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
  it("status 400: returns an error if invalid username is provided", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "markeywarkey", body: "I really loved this game!" })
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, bad data!" });
      });
  });
  it("status 400: returns an error if empty post request made", () => {
    return request(app)
      .post("/api/reviews/2/comments")
      .send({})
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, bad data!" });
      });
  });
  it("status 400: returns an error when an review_id doesn't exist", () => {
    return request(app)
      .post("/api/reviews/19000/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, bad data!" });
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
});

describe("/api/comments/:comment_id", () => {
  it("status 204: deletes a comment by comment Id", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  it("status 404: returns an error when an invalid comment format is input", () => {
    return request(app)
      .delete("/api/comments/dogs")
      .expect(400)
      .then(({ body }) => {
        expect(body).toEqual({ msg: "Sorry, id not a valid input!" });
      });
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
            "DELETE /api/comments/:comment_id": {
              description: "delete a comment by comment_id",
              queries: [],
            },
          },
        });
      });
  });
});

describe("/api/users", () => {
  it.only("status 200: returns an array of objects of username", () => {
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
