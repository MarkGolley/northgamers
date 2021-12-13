# BE Northcoders NC Games Portfolio Check List

## Readme - Remove the one that was provided and write your own:

Generally things are good, and you are failing very few of our tests. BUT you are contacting your database why more times than is needed! Please refactor your endpoints. You DO NOT NEED to be checking if the ID exists for every endpoint. Please refer back to the notes from the lecture to realise why we needed it in that example. If you are fetching an article by ID it will tell you if it hasn't got it! Same for deleting and patching. Making another connection to your DB will slow the API down as you only have a set number of connections in your pool.

- [✓] Link to hosted version
- [✓] Write a summary of what the project is
- [✓] Provide clear instructions of how to clone, install dependencies, seed local database, and run tests
- [✓] Include information about how to create `.env.test` and `.env.development` files
- [✓] Specify minimum versions of `Node.js` and `Postgres` needed to run the project

## General

- [✓] Remove any unnecessary `console.logs` and comments
- [✓] Remove all unnecessary files (e.g. old `README.md`, `error-handling.md`, `hosting.md`, `./db/utils/README.md` etc.)
- [✓] Functions and variables have descriptive names

## Creating tables

- [✓] Use `NOT NULL` on required fields
- [✓] Default `created_at` in reviews and comments tables to the current date:`TIMESTAMP DEFAULT NOW()`

## Inserting data

- [✓] Drop tables and create tables in seed function in correct order
- [✓] Make use of pg-format to insert data in the correct order

## Tests

- [✓] Seeding before each test
- [✓] Descriptive `it`/`test` block descriptions
- [✓] If asserting inside a `forEach`, also has an assertion to check length is at least > 0
- [✓] Evidence of building up complex query endpoints using TDD
- [✓] Ensure all tests are passing
- [ ] Cover all endpoints and errors

- `GET /api/categories`

  - [ ] Status 200, array of category objects - _wrong key!_

- `GET /api/reviews/:review_id`

  - [✓] Status 200, single review object (including `comment_count`)
  - [✓] Status 400, invalid ID, e.g. string of "not-an-id"
  - [✓] Status 404, non existent ID, e.g. 0 or 9999

- `PATCH /api/reviews/:review_id`

  - [✓] Status 200, updated single review object
  - [✓] Status 400, invalid ID, e.g. string of "not-an-id"
  - [✓] Status 400, invalid inc_votes type, e.g. property is not a number
  - [✓] Status 404, non existent ID, e.g. 0 or 9999
  - [✓] Status 200, missing `inc_votes` key. No effect to article.

- `GET /api/reviews`

  - [✓] Status 200, array of review objects (including `comment_count`, excluding `body`)
  - [✓] Status 200, default sort & order: `created_at`, `desc`
  - [✓] Status 200, accepts `sort_by` query, e.g. `?sort_by=votes`
  - [✓] Status 200, accepts `order` query, e.g. `?order=desc`
  - [✓] Status 200, accepts `category` query, e.g. `?category=dexterity`
  - [✓] Status 400. invalid `sort_by` query, e.g. `?sort_by=bananas`
  - [✓] Status 400. invalid `order` query, e.g. `?order=bananas`
  - [✓] Status 404. non-existent `category` query, e.g. `?category=bananas`
  - [✓] Status 200. valid `category` query, but has no reviews responds with an empty array of reviews, e.g. `?category=children's games`

- `GET /api/reviews/:review_id/comments`

  - [✓] Status 200, array of comment objects for the specified review
  - [✓] Status 400, invalid ID, e.g. string of "not-an-id"
  - [✓] Status 404, non existent ID, e.g. 0 or 9999
  - [✓] Status 200, valid ID, but has no comments responds with an empty array of comments

- `POST /api/reviews/:review_id/comments`

  - [✓] Status 201, created comment object
  - [✓] Status 400, invalid ID, e.g. string of "not-an-id"
  - [✓] Status 404, non existent ID, e.g. 0 or 9999
  - [✓] Status 400, missing required field(s), e.g. no username or body properties
  - [✓] Status 404, username does not exist
  - [✓] Status 201, ignores unnecessary properties

- `DELETE /api/comments/:comment_id`

  - [✓] Status 204, deletes comment from database
  - [✓] Status 404, non existent ID, e.g 999
  - [✓] Status 400, invalid ID, e.g "not-an-id"

- `GET /api`

  - [✓] Status 200, JSON describing all the available endpoints

## Routing

- [✓] Split into api, categories, users, comments and reviews routers
- [✓] Use `.route` for endpoints that share the same path

## Controllers

- [✓] Name functions and variables well
- [✓] Add catch blocks to all model invocations (and don't mix use of`.catch(next);` and `.catch(err => next(err))`)

## Models

- Protected from SQL injection
  - [✓] Using parameterized queries for values in `db.query` e.g `$1` and array of variables
  - [✓] Sanitizing any data for tables/columns, e.g. greenlisting when using template literals or pg-format's `%s`
- [✓] Consistently use either single object argument _**or**_ multiple arguments in model functions
- [ ] Use `LEFT JOIN` for comment counts - _using subquery instead_

## Errors

- [ ] Use error handling middleware functions in app and extracted to separate directory/file
- [✓] Consistently use `Promise.reject` in either models _**OR**_ controllers

## Extra Tasks - To be completed after hosting

- `GET /api/users`

  - [ ] Status 200, responds with array of user objects

- `GET /api/users/:username`

  - [ ] Status 200, responds with single user object
  - [ ] Status 404, non existent ID, e.g 999
  - [ ] Status 400, invalid ID, e.g "not-an-id"

- `PATCH /api/comments/:comment_id`

  - [ ] Status 200, updated single comment object
  - [ ] Status 400, invalid ID, e.g. string of "not-an-id"
  - [ ] Status 400, invalid inc_votes type, e.g. property is not a number
  - [ ] Status 404, non existent ID, e.g. 0 or 9999
  - [ ] Status 200, missing `inc_votes` key. No effect to comment.

## Extra Advanced Tasks

### Easier

- [ ] Patch: Edit an review body
- [ ] Patch: Edit a comment body
- [ ] Patch: Edit a user's information
- [ ] Get: Search for an review by title
- [ ] Post: add a new user

### Harder

- [ ] Protect your endpoints with JWT authorization. We have notes on this that will help a bit, _but it will make building the front end of your site a little bit more difficult_
- [ ] Get: Add functionality to get reviews created in last 10 minutes
- [ ] Get: Get all reviews that have been liked by a user. This will require an additional junction table.
- [ ] Research and implement online image storage or random generation of images for categories

## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### ESSENTIAL GET `/api/categories`

Assertion: expected { Object (category_id, description) } to deeply equal { Object (slug, description) }

Hints:

- send categories to the client in an object, with a key of categories: `{ categories: [] }`
- use the data from the `test-data` in your tests
- ensure there are no discrepancies between the README specification and your table column names

### ESSENTIAL GET `/api/reviews`

Assertion: the first review should have `review_id === 7`: expected 9 to equal 7

Hints:

- the default sort should be by `created_at` and the default order should be `desc`

### ESSENTIAL GET `/api/reviews?sort_by=owner`

Assertion: expected 'bainesface' to equal 'philippaclaire9'

Hints:

- accept a `sort_by` query, with a value of any column name
- use `owner` for the column to store the username that created the review

### ESSENTIAL GET `/api/reviews?order=asc`

Assertion: expected 'A truly Quacking Game; Quacks of Quedlinburg' to equal 'Settlers of Catan: Don\'t Settle For Less'

Hints:

- accept an `order` query of `asc` or `desc`
