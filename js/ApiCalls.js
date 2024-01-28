export class ApiCalls {
  //fetches data by first letter
  static async searchByFirstLetter(letter) {
    //in case first letter is empty
    if(!letter){
      return{meals: undefined}
    }
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  //fetches details 
  static async getMealDetailsByID(id) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  //fetches all available categories
  static async getAllCategories() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  //fetches all Areas
  static async getAllArea() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  //fetches all ingredients
  static async getAllIngredients() {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  //fetches by ingredient 
  static async searchByIngredient(ing) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  //fetches by category
  static async searchByCategory(cat) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  //fetches by area 
  static async searchByArea(area) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    );
    let finalResponse = await response.json();
    return finalResponse;
  }
  //fetches by name
  static async searchByName(name){
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    let finalResponse = await response.json();
    return finalResponse
  }
}
  