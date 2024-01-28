export class UserInterface {
  constructor() {
    //close the navbar by default
    this.closeNavbar();

    $(".nav-header").click(() => {
      //if navbar open close it and re-add burger icon
      if ($(".side-nav-menu").css("margin-left") == "0px") {
        this.closeNavbar();
      } else {
        //else open it and add X icon
        this.openNavbar();
      }
    });
  }

  //closing navbar function that calculates outerwidth and adds the X button
  closeNavbar() {
    let navBodyWidth = $(".nav-tab").outerWidth(true);
    $(".side-nav-menu").animate({ marginLeft: -navBodyWidth }, 500);
    $(".open-close-icon").removeClass("fa-xmark");
    $(".open-close-icon").addClass("fa-align-justify");

    //do close animation
    $(".links li").animate({ top: 300 }, 500);
  }

  //open navbar function by animating the left margin and readding the burger icon
  openNavbar() {
    $(".side-nav-menu").animate({ marginLeft: 0 }, 500);
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-xmark");

    //do open animation
    for (let i = 0; i < $(".links li").length; i++) {
      const element = $(".links li").eq(i);
      element.animate({ top: 0 }, i * 100 + 500);
    }
  }

  //shows overlay when given the state of wether it is under the navbar or on top of it. default value is under
  showOverlay(state = "under") {
    if (state == "ontop") {
      $(".loadingOverlay").css("z-index", "1991");
    } else if (state == "under") {
      $(".loadingOverlay").css("z-index", "1");
    }
    $(".loadingOverlay").fadeIn(300);
  }
  //hides overlay by fading it out for half a second
  hideOverlay() {
    $(".loadingOverlay").fadeOut(500);
  }

  displayMainView() {
    //hide details and contact us sections
    $(".details, .contact-us").css("display", "none");
    //display main section
    $("main").css("display", "block");
    //clear meal list section
    $("#mealListContainer").empty();
  }

  displayMeals(meals, isSearch) {
    //display main section and hide other sections
    this.displayMainView();
    let mealsarr = "";
    //check if meals have actual data inside it to start the fore loop. if not then meal.length will be set to 0 and the for loop will not start
    let mealLength = meals ? meals.length : 0;
    for (let i = 0; i < mealLength; i++) {
      mealsarr += `
            <div class="col-md-3 " >
              <div class="imgContainer meal rounded position-relative overflow-hidden" data-meal-id="${meals[i].idMeal}">
                <img
                  class="img-fluid"
                  src="${meals[i].strMealThumb}"
                  alt=""
                />
                <div
                  class="imgOverlay bg-white bg-opacity-75 position-absolute top-100 d-flex align-items-center h-100 w-100"
                >
                  <h3 class="text-black">${meals[i].strMeal}</h3>
                </div>
              </div>
            </div> 
            `;
    }

    //sending the ready html to the #mealListContainer using Jquery
    $("#mealListContainer").html(mealsarr);
  }

  //displaying categories
  displayCategories(categories) {
    this.displayMainView();

    let categoriesArr = "";
    //refer to displayMeals()
    for (let i = 0; i < categories.length; i++) {
      const element = categories[i];
      categoriesArr += `<div class="col-md-3 categoryItem">
      <div class="imgContainer meal rounded position-relative overflow-hidden">
        <img
          class="img-fluid"
          src="${element.strCategoryThumb}"
          alt=""
        />
        <div
          class="imgOverlay bg-white bg-opacity-75 position-absolute top-100 d-flex align-items-center h-100 w-100"
        >
          <h3 class="text-black">${element.strCategory}</h3>
        </div>
      </div>
    </div>
    `;
    }

    $("#mealListContainer").html(categoriesArr);
  }
  //displaying search bar 
  displaySearch() {
    this.displayMainView();
    let searchfields = `<div class="container  mb-3" id="searchContainer">
    <div class="row py-4">
        <div class="col-md-6">
            <input type="text" class="form-control bg-transparent text-white" placeholder="Search by Name" id="nSearch">
        </div>
        <div class="col-md-6">
            <input type="text" maxlength="1" class="form-control bg-transparent text-white" placeholder="Search By First Letter" id="flSearch">
        </div>
    </div>
  </div>`;
    $("#searchbar").html(searchfields);

    //make loading overlay top parameter to be below the search div
    let searchOffsetBottom = $("#searchbar").offset().top + $("#searchbar").outerHeight();
    $(".loadingOverlay").css("top", searchOffsetBottom + "px");
  }
  //hiding the search bar so it looks more aesthetically pleasing
  hideSeach() {
    //empty search div contents
    $("#searchbar").empty();
    //revert overlay back to normal
    $(".loadingOverlay").css("top", 0);
  }
  //called when items are clicked to display details
  displayDetails(meal) {
    //hide main and contact us section
    $("main, .contact-us").css("display", "none");
    //show details view
    $(".details").css("display", "block");

    let ingredients = ``;
    //for loop to get only 20 ingredients out of the hundreds
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients += `<li class="alert alert-info d-block m-2 p-1">${
          meal[`strMeasure${i}`]
        } ${meal[`strIngredient${i}`]}</li> `;
      }
    }
    //splitting tags as they come with "," between them
    let tags = meal.strTags?.split(",");
    //checking if tags are there. if not, make it an empty tag array
    if (!tags) {
      tags = [];
    }
    //tags html
    let tagsarr = ``;
    for (let i = 0; i < tags.length; i++) {
      tagsarr = `<li class="alert alert-danger m-2 p-1 d-block">${tags[i]}</li> `;
      console.log(tagsarr);
    }

    let details = `
        <div class="col-md-4">
        <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area : </span> ${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category : </span> ${meal.strCategory}</h3>
        <h3 class="fw-bolder">Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>
        <h3 class="fw-bolder">Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsarr}
        </ul>
        <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
        <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>`;
    //adding the html to the DOM
    $("#details").html(details);
    //hiding main view
    $("#mainView").css("display", "none");
  }
  //displays contact us 
  displayContactUs() {
    //hide main and details sections
    $("main, .details").css("display", "none");
    //show contact us view
    $(".contact-us").css("display", "flex");
  }
  //displays area while taking the array of areas fetched from API
  displayArea(arrArea) {
    let area = ``;
    for (let i = 0; i < arrArea.length; i++) {
      area += `
      <div class="col-md-3">
      <div class="rounded-2 text-center cursor-pointer area-item" data-area-id="${arrArea[i].strArea}">
        <i class="fa-solid fa-house-laptop fa-4x">
          <h3>${arrArea[i].strArea}</h3>
        </i>
      </div>
    </div>`;
    }
    //to display it in the main view
    this.displayMainView();
    //displaying it under meallistcontainer
    $("#mealListContainer").html(area);
  }
  //displays ingredients fetched from API
  displayIngredients(ing) {
    let ingredients = ``;
    //strDescription split to get the words then sliced so that only 20 words are there then joined back again
    for (let i = 0; i < ing.length; i++) {
      ingredients += `
      <div class="col-md-3">
      <div class="rounded-2 text-center cursor-pointer ingredient-item" data-ing-id=${
        ing[i].strIngredient
      }>
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${ing[i].strIngredient}</h3>
        <p>${ing[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
      </div>
    </div>`;
    }
    this.displayMainView();
    $("#mealListContainer").html(ingredients);
  }
}
