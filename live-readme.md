- HOSTED SITE

  - https://nc-games-mg2.herokuapp.com/

- PROJECT SUMMARY

  - I have built an API for the purpose of accessing application data programmatically for a mimick real world backend service (such as reddit) which provides this information to the front end architecture.

  - The database is in PSQL, and interactions with it are using [node-postgres](https://node-postgres.com/).

- INSTRUCTIONS

  - clone - to clone this repo.... within your desired directory, type "git clone https://git.heroku.com/nc-games-mg2.git" in your CLI (ensure it is targeted in the correct directory).

  - install dependencies - to install the necessary dependencies .... ensure your CLI reaches the correct directory (the repo directory where the clone was installed) and type "npm i dotenv express pg pg-format" and this will install the dependencies needed.

  - seed local database - to seed the local database.... ensuring the CLI is in your repo directory, type "npm run setup-dbs" and this will seed the database to your local machine.

    - Note that Node.js needs to be at least version 16.11.1
    - Note that Postgres needs to be at least version 14.0

  - run tests - to run the tests provided.... ensuring the CLI is in your repo directory, type "npm t". This will run the tests.

  - .env files - to create the required .env files.... in the root directory, create a ".env.dev" and a ".env.test" file. Both of these should be added to gitignore. Within these two files should be the variable PGDATABASE being set to either the dev or test variable depending on which file you are preparing e.g. .env.test should contain PGDATABASE=nc_games_test which should relate to the setup.sql file (inside of the DB directory) which details the database names.
