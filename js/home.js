import { UserInterface } from "./UserInterface.js";
import { ApiCalls } from "./ApiCalls.js";
import { ContactRegex } from "./contactRegex.js";

export class Home {
  constructor() {
    //creating new ui instance
    this.ui = new UserInterface();
    //displaying the meals when page first loads
    this.displayMealsOnStartup("ontop");
    //setting all the navbar onclick events
    this.setupNavbarClickFunctions();
    //calling regex setup
    ContactRegex.setupRegex();
  }

  //sets up all navbar on click events and the navbar closing functionality
  setupNavbarClickFunctions() {
    $("#categoriesTab").on("click", () => {
      this.fetchCategories();
      this.ui.closeNavbar();
      this.ui.hideSeach();
    });

    $("#contactUsTab").on("click", () => {
      this.ui.displayContactUs();
      this.ui.closeNavbar();
      this.ui.hideSeach();
    });

    $("#searchTab").on("click", () => {
      this.fetchSearch();
      this.ui.closeNavbar();
    });

    $("#areaTab").on("click", () => {
      this.fetchArea();
      this.ui.closeNavbar();
      this.ui.hideSeach();
    });
    $("#ingredientsTab").on("click", () => {
      this.fetchIngredients();
      this.ui.closeNavbar();
      this.ui.hideSeach();
    });
  }
  //function that is called when ingredients tab is clicked on to fetch from api data then display it and sets up the details on click
  fetchIngredients() {
    this.ui.showOverlay();
    ApiCalls.getAllIngredients().then((res) => {
      console.log(res.meals.slice(0, 20));
      this.ui.displayIngredients(res.meals.slice(0, 20));
      this.ui.hideOverlay();
      this.setupIngredientsOnClick();
    });
  }
  //adds on click event listener to add the details page
  setupIngredientsOnClick() {
    $(".ingredient-item").click((e) => {
      if ($(e.target).data("ingId") == undefined) {
        let id = $(e.target).parent().data("ingId");
        this.searchByIngredientUsingId(id);
      } else {
        let id = $(e.target).data("ingId");
        this.searchByIngredientUsingId(id);
      }
    });
  }
  //for searching the ingredients by using the id retrieved from api 
  searchByIngredientUsingId(id) {
    ApiCalls.searchByIngredient(id).then((res) => {
      this.ui.showOverlay();
      this.ui.displayMeals(res.meals);
      this.setupMealOnclick();
      this.ui.hideOverlay();
    });
  }
  //function that is called when area tab is clicked on to fetch from api data then display it and sets up the details on click
  fetchArea() {
    this.ui.showOverlay();
    ApiCalls.getAllArea().then((res) => {
      this.ui.displayArea(res.meals);
      this.ui.hideOverlay();
      this.setupAreaOnClick();
    });
  }
  //sets up the on click function to retrieve data from html then search 
  setupAreaOnClick() {
    $(".area-item").click((e) => {
      if ($(e.target).data("areaId") == undefined) {
        let id = $(e.target).parent().data("areaId");
        this.searchByAreaUsingId(id);
      } else {
        let id = $(e.target).data("areaId");
        this.searchByAreaUsingId(id);
      }
    });
  }
  //searches the area using id obtained from html
  searchByAreaUsingId(id) {
    ApiCalls.searchByArea(id).then((res) => {
      this.ui.showOverlay();
      this.ui.displayMeals(res.meals);
      this.setupMealOnclick();
      this.ui.hideOverlay();
    });
  }
  //displays the meals when the body loads 
  displayMealsOnStartup(state) {
    this.ui.showOverlay(state);
    this.searchByNameStartup("").then(() => {
      this.ui.hideOverlay();
    });
  }
    //function that is called when categories tab is clicked on to fetch from api data then display it and sets up the on click
  fetchCategories() {
    this.ui.showOverlay();
    ApiCalls.getAllCategories().then((res) => {
      this.ui.displayCategories(res.categories);
      this.ui.hideOverlay();
      this.setupCategoryOnClicks();
    });
  }
    //function that is called when search tab is clicked on to fetch from api data then display it and sets up the details on click
  fetchSearch() {
    this.ui.displaySearch();
    this.setupSearch();
    this.setupFirstLetterSearch();
  }
  //sets up even listeners on the search input fields
  setupSearch() {
    $("#nSearch").on("keyup", () => {
      this.ui.showOverlay();
      ApiCalls.searchByName($("#nSearch").val()).then((res) => {
        this.ui.displayMeals(res.meals, true);
        this.setupMealOnclick();
        this.ui.hideOverlay();
      });
    });
  }
    //sets up even listeners on the search by first letter input fields
  setupFirstLetterSearch() {
    $("#flSearch").keyup(() => {
      this.ui.showOverlay();
      ApiCalls.searchByFirstLetter($("#flSearch").val()).then((res) => {
        this.ui.displayMeals(res.meals, true);
        this.setupMealOnclick();
        this.ui.hideOverlay();
      });
    });
  }
  //sets up categories on click event
  setupCategoryOnClicks() {
    //setup on click for each categorry
    $(".categoryItem").on("click", (e) => {
      //get the text of the category
      let categoryText = $(e.currentTarget)
        .children()
        .children()
        .eq(1)
        .children()
        .text()
        .trim();
      ApiCalls.searchByCategory(categoryText).then((res) => {
        this.ui.showOverlay();
        this.ui.displayMeals(res.meals);
        this.setupMealOnclick();
        this.ui.hideOverlay();
      });
    });
  }
  //function only fired when page is reloaded
  async searchByNameStartup(name) {
    let response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    );
    let finalResponse = await response.json();
    this.ui.displayMeals(finalResponse.meals);
    this.setupMealOnclick();
  }
  //sets up all meal on click that leads to details
  setupMealOnclick() {
    $(".meal").click((e) => {
      let id = $(e.target).parent().data("mealId");
      console.log(id);
      this.ui.showOverlay();
      ApiCalls.getMealDetailsByID(id).then((result) => {
        this.ui.displayDetails(result.meals[0]);
        this.ui.hideOverlay();
      });
    });
  }
}
