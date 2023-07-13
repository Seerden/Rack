# What is this?

A small weightlifting session tracking application. 

When I was actively
weigtlifting, I wanted a small application to help me track and automatically
determine what to do the next time I wanted to lift weights. 

It's been a while since I lifted any weights, so naturally my interest in this
project dwindled a little bit. One day I'll get around to working this project out (ha)
a little more.

## What are we using to build this?
The frontend is a SPA React application bundled with webpack. The backend runs
Node with Express, we use postgres 14 and redis for persistence and in-memory
storage. There is no ORM, we write our queries by hand (a little tedious, but a
great way for yours truly to get better at SQL).

Both the front- and backend run TypeScript of course, and everything runs in
docker containers.

# Where can I use this application?

We're not even close to a usable product, so this is not live yet anywhere. You can run the application locally, though.

# How do I run this?

Provided you have docker set up on your machine:
- make sure all your environment variables are set up. 
  - [TODO: provide a list of required environment variables]
- run any of the npm scripts in the top-level package.json to start the composed
  containers up and interact with them. `npm run dev` and `npm run dev-down`
  start up and shut down the entire application.
