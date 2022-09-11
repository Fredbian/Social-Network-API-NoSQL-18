# Social-Network-API-NoSQL-18

## Description
This Challenge is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. Using Express.js for routing, a MongoDB database, and the Mongoose ODM.

## User Story
```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria
```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation
* Install API
```
npm i
```

* Add a .env file to the root folder with the following details
```
MONGO_URI='mongo+srv://<user>:<pass>@<host>:<port>/<database>?<connection options>'
```

* Start App
```
npm start
```

## Screenshots


## URLs
* Github: https://github.com/Fredbian/Social-Network-API-NoSQL-18 
* Walkthrough Video: https://drive.google.com/file/d/152y7i5heh6Iiuls3NaBYP2VMM5ChO7QU/view 