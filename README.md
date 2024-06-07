# Shake It!

## [See the App!](https://shakeit-project.netlify.app)

![App Logo](https://ibb.co/L8pb1WD)

## Description
Shake It! is a web app for creating, editing, and managing cocktails. Users can create their own cocktail recipes, edit and delete them, comment on other users cocktails, and add their favorites to a personal list.

**NOTE -** Describe your project in one/two lines.

#### [Client Repo here](https://github.com/Valveider-X/ShakeIt)
#### [Server Repo here](https://github.com/Valveider-X/ShakeIt-Server)

## Backlog Functionalities

**NOTE -** 
- Social media sharing for cocktails
- Rating system for cocktails
- User profiles with avatar and bio
- Advanced search filters (by ingredient, type, etc.)
- Integration with external cocktail APIs for more recipes

## Technologies used

**NOTE -** 
- HTML
- CSS
- JavaScript
- Express
- React
- Axios
- React Context
- MongoDB
- Mongoose
- MUI
- Leaflet
- Cloudinary
- Carrousel-react-mui

# Server Structure

## Models

User model

```javascript
{
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  password: {type: String, required: true},
  favorites: [{type: Schema.Types.ObjectId,ref:'Cocktail'}]
}
```

Cocktail model

```javascript
 {
   name: {type: String, required: true, trim: true},
   category: {type: String, required: true, enum: ["Classic Cocktails", "Highballs", "Seasonal Cocktails", "Dessert Cocktails", "Mocktails", "Fizz Cocktails", "Tiki Cocktails", "Bitter Cocktails", "Punches", "Aged Cocktails", "Coffee Cocktails", "Sour Cocktails", "Infused Cocktails", "Modern Classics", "Egg White Cocktails", "Crushed Ice Cocktails",  "Sweet and Sour Cocktails", "Fresh Herb Cocktails", "Spiced Cocktails", "Smoked Cocktails"],
    imageUrl: {type: String},
    description: {type: String},
    ingredients: {type: [Schema.Types.ObjectId], ref: "Ingredient"},
    steps:{type: String, required: true}
   owner: {type: Schema.Types.ObjectId,ref:'Comment'},
 }
```
Comment model

```javascript
 {
   user: {type: Schema.Types.ObjectId, ref: User},
    cocktail: {type: Schema.Types.ObjectId, ref: Cocktail},
    description: {type: String, required: true},
 }
```
Ingredients model

```javascript
 {
   name: {type: String, required: true, trim: true},
    hasAlcohol: {type: Boolean, default: false},
    alcoholGraduation: {type: String}
    img: {type: String}
    description: {type: String, required: true},
 }
```
## API Endpoints (backend routes)


api/user/:cocktailId/fav <

| HTTP Method | URL                     | Request Body               | Success status | Error Status | Description                                                 |
| ----------- | ----------------------- | ---------------------------| -------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------|
| POST        | `/auth/signup`          | {name, email,     | 201    | 400          | Registers the user in the Database                                |  password}        |
| POST        | `/auth/login`           | {username,        | 200    | 400          | Validates credentials, creates and sends Token                                   | password}         |
| GET         | `/auth/verify`          |                   | 200    | 401          | Verifies the user Token                                   |                   |
| GET         | `/cocktails`            |                   | 200    | 400          | Show cocktails in the DB, only titles and images                                  |                   |
| POST        | `/cocktails`            | {apiId}           | 201    | 400          | Creates a new Cocktail Document                                |                   |
| GET         | `/cocktails/:cocktailId`|                   | 200    | 400, 401     | Sends all cocktails Details                                 |                   |
| PUT         | `/cocktails/:cocktailId`|                   | 200    | 400, 401     | Edits cocktails document                                |                   |
| DELETE      | `/cocktails/:cocktailId`|                   | 200    | 401          | Deletes cocktails document                                |                   |
| PATCH       | `/user/:cocktailId/fav` |                   | 200    | 
401           | Add cocktail the user favorite profile      |                        
| GET         | `/comments`             |                   | 200    | 400          | Show comments in the DB      |
| POST        | `/comments`             | {apiId}           | 201    | 400          | Creates a new Cocktail Document                                |                   |
| GET         | `/comments/:commentId`  |                   | 200    | 400, 401     | Sends all cocktails Details                                 |

  
## Links

### Collaborators

[Xavi](www.github-url.com)


### Project

[Shake It! Client](https://github.com/Valveider-X/ShakeIt)

[Shake It! Server](https://github.com/Valveider-X/ShakeIt-Server)

[Deploy Link](https://shakeit-project.netlify.app/)


### Slides

[Slides Link](www.your-slides-url-here.com)