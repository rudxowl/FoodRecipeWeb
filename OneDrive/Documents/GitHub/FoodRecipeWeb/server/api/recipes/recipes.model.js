import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let ObjectId = mongoose.Schema.Types.ObjectId;

// Schema to hold ingredients for a recipe
// Uses an array of strings, because you need an arbitrary number of ingredients that you don't know ahead of time, with each element being an ingredient
let ingredientsSchema = Schema({
  ingredients: { type: [String], required: true }
});

// This is the main user schema
// The name, description, and picture link are all required strings, so the recipe has to have a name description and picture in it. Cooktime and preptime are required but can be 0 (in case a recipe doesn't need to be cooked or something like that). Directions is an array of strings to each step, to allow an arbitrary number of steps. Reviews are an array of objectids pointing to reviews in the reviewschema, and is not required because reviews shouldn't be created on creation of recipe.
let recipeSchema = Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  picture: { type: String, required: true },
  preptime: { type: Number, required: true },
  cooktime: { type: Number, required: true },
  directions: { type: [String], required: true },
  ingredients: { type: ingredientsSchema, required: true },
  reviews: { type: [ObjectId], required: false }
});

let Recipe = mongoose.model('Recipe', recipeSchema);

// This is the review schema, which I included in the recipes module as an organizational choice, because reviews are tied to the recipes that they pertain to.
// The description is a string, and it is required so the user has to write something for their review. Rating is a number between 1 and 5 stars, so I set a min and max for that. Date is a date object which is set automatically when creating/editing the review, so it is not required as an input. User is an objectid which needs to be input, so it is required.
let reviewSchema = Schema({
  description: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  date: { type: Date, required: false },
  user: { type: ObjectId, required: true, ref: 'Recipe' }
});

let Review = mongoose.model('Review', reviewSchema);

// Export the two created models, Recipe and Review
export { Recipe, Review };
