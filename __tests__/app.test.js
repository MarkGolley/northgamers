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
        console.log("first body:", body);
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
        expect(body).toEqual({ msg: "Sorry, review_id not a valid input!" });
      });
  });
  it.only("status 204: returns the updated review when a valid review is input via patch", () => {
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
