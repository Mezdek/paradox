# Paradox
#### This project's main aim is to build a simple website yet to cover everything. This was the last checkpoint in Wild Code School.

* [What it does](#what-it-does)
* [How to start](#how-to-start)
* [Technical details](#technical-details)

## What it does
* It shows posts, which are previously saved in the database and it gives the possibility to add new posts.
* Each post has a title, a text in addition to author and date.
* To read posts no login is required, however to add new posts a login is required. Registration is very easy.
* A post can be searched by title or author.

## How to start
1. First install the dependencies by running
```bash
npm install
# or
yarn install
```

2. You need to have `mysql2` installed. After signing in create a database then import the dump file `dump.sql` located in the `database` folder.

3. Copy the `.env.sample` file to `.env` and fill in the values.

4. Then run the server by running
```bash
npm run dev
# or
yarn dev
```
5. Finally, open the browser to [http://localhost:3000](http://localhost:3000)

## Technical details

This project was built using:
* [Next.js](https://nextjs.org/docs)
* [CSS Modules](https://github.com/css-modules/css-modules)
* [mysql2](https://github.com/sidorares/node-mysql2#readme)
* [axios](https://axios-http.com/docs/intro)
* [argon2](https://github.com/ranisalt/node-argon2#readme)
* [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)

