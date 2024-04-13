# My Learning Node.js

## Introduction

Hello visitor! This repository is dedicated to my journey of learning Node.js. I'm documenting the projects I create while learning, and I hope they'll be useful to you in your Node.js journey as well. The projects in this repository are built using Express.js and MongoDB.

## Project Details
### Technologies Used

- Node.js
- Express.js
- MongoDB

### Project 01: REST API

This project focuses on building a RESTful API using Node.js, Express.js, and MongoDB. It includes CRUD (Create, Read, Update, Delete) operations for managing user data.

#### Endpoints

- `GET /api/users`: Get all users from the database.
- `GET /users`: Get all users and display them in HTML format.
- `GET /api/users/:id`: Get a specific user by ID.
- `PATCH /api/users/:id`: Update a user's information.
- `DELETE /api/users/:id`: Delete a user by ID.
- `POST /api/users`: Create a new user.

### Project 02: Shorten URL

This is a URL shortener built with Node.js, Express.js, and MongoDB. It enables users to generate short URLs for long links and provides analytics for tracking visits to these shortened URLs.

## File Structure

- **index.js**: Main entry point for server setup and routing.
- **connect.js**: MongoDB connection setup.
- **models/url.js**: MongoDB schema for URL entries.
- **routes/url.js**: Route handlers for URL shortening and analytics.
- **controllers/url.js**: Logic implementation for generating short URLs and handling analytics.

### Generating Short URLs

- Send a POST request to `/url` with the long URL in the request body.
- Example: `{ "longURL": "https://www.example.com/long-url" }`
- Receive a short URL in response that redirects to the provided long URL.

### Analytics

- Send a GET request to `/url/analytics/:shortId` for analytics of a specific short URL.
- Example: `/url/analytics/abc123`
- Receive visit history and statistics for the short URL identified by `:shortId`.


