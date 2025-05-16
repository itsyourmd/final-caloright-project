/* jshint esversion: 6 */

// --- MENU TOGGLE ---
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menu-toggle");
const closeMenu = document.getElementById("close-menu");

menuToggle.addEventListener("click", () => {
  menu.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  menu.classList.remove("active");
});

// --- DESKTOP SEARCH ELEMENTS ---
const searchInput = document.getElementById("search-input");
const suggestionsList = document.getElementById("suggestions-list");
const searchForm = document.getElementById("search-form");
const suggestionContainer = document.getElementById("suggestion-container");

// --- MOBILE SEARCH ELEMENTS ---
const searchInputMobile = document.getElementById("search-input-mobile");
const suggestionsListMobile = document.getElementById("suggestions-list-mobile");
const suggestionContainerMobile = document.getElementById("suggestion-container-mobile");
const searchFormMobile = document.getElementById("search-form-mobile");

// --- COMMON SUGGESTIONS ---
const suggestions = [
  "About Us",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Nutrition Basics",
  "Nutritionist",
  "Calorie Calculator",
  "Community",
  "Customer Service",
  "Meal Planner",
  "Menu",

];

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, "");
}

// --- SHOW SUGGESTIONS FOR DESKTOP ---
function showSuggestions(query) {
  suggestionsList.innerHTML = "";
  const filtered = suggestions.filter((item) =>
    normalize(item).startsWith(normalize(query))
  );

  if (filtered.length > 0) {
    suggestionContainer.style.display = "block";
    filtered.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      suggestionsList.appendChild(li);
    });
  } else {
    suggestionContainer.style.display = "none";
  }
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (query) {
    showSuggestions(query);
  } else {
    suggestionContainer.style.display = "none";
  }
});

searchInput.addEventListener("focus", () => {
  const query = searchInput.value.trim();
  if (query) showSuggestions(query);
});

suggestionsList.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    searchInput.value = event.target.textContent;
    suggestionContainer.style.display = "none";
  }
});

// --- DESKTOP SEARCH SUBMIT ---
searchForm.addEventListener("submit", (event) => {
  handleSearchSubmit(event, searchInput);
});

// --- MOBILE SUGGESTION SYSTEM ---
function attachSuggest(inputEl, listEl, containerEl) {
  inputEl.addEventListener("input", () => {
    const query = inputEl.value.trim();
    if (query) showSuggestionsOn(inputEl, listEl, containerEl, query);
    else containerEl.style.display = "none";
  });

  inputEl.addEventListener("focus", () => {
    const query = inputEl.value.trim();
    if (query) showSuggestionsOn(inputEl, listEl, containerEl, query);
  });

  listEl.addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
      inputEl.value = event.target.textContent;
      containerEl.style.display = "none";
    }
  });
}

function showSuggestionsOn(inputEl, listEl, containerEl, query) {
  listEl.innerHTML = "";
  const filtered = suggestions.filter(item =>
    normalize(item).startsWith(normalize(query))
  );

  if (filtered.length) {
    containerEl.style.display = "block";
    filtered.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      listEl.appendChild(li);
    });
  } else {
    containerEl.style.display = "none";
  }
}

attachSuggest(searchInput, suggestionsList, suggestionContainer);
attachSuggest(searchInputMobile, suggestionsListMobile, suggestionContainerMobile);

// --- CLOSE SUGGESTIONS ON CLICK OUTSIDE (both desktop and mobile) ---
document.addEventListener("click", (event) => {
  const isDesktop = !searchInput.contains(event.target) && !suggestionContainer.contains(event.target);
  const isMobile  = !searchInputMobile.contains(event.target) && !suggestionContainerMobile.contains(event.target);
  if (isDesktop) suggestionContainer.style.display = "none";
  if (isMobile)  suggestionContainerMobile.style.display = "none";
});

// --- SEARCH SUBMIT LOGIC (SHARED) ---
function handleSearchSubmit(event, inputEl) {
  event.preventDefault();

  const queryRaw = inputEl.value.trim();
  if (!queryRaw) {
    inputEl.focus(); // Optional: refocus to guide user
    return; // Do nothing if empty
  }

  const query = normalize(queryRaw);

  const redirectMap = {
    aboutus: "/HTML/about-us.html",
    breakfast: "/HTML/breakfast.html#breakfast",
    nutritionbasics: "/HTML/nutrition-basics.html",
    caloriecalculator: "/HTML/calculator.html",
    nutritionist: "/HTML/nutritionist.html",
    community: "/HTML/community.html",
    customerservice: "/HTML/customer-service.html",
    mealplanner: "/HTML/meal-planner.html",
    menu: "/HTML/community",
    breakfast: "/HTML/menu.html",
    lunch: "/HTML/menu.html#lunch",
    dinner: "/HTML/menu.html#dinner"
  };

  if (redirectMap[query]) {
    window.location.href = redirectMap[query];
  } else {
    window.location.href = "./search-result.html";
  }
}

// --- MOBILE SEARCH FORM SUBMIT ---
searchFormMobile.addEventListener("submit", (event) => {
  handleSearchSubmit(event, searchInputMobile);
});


// --- MOBILE SEARCH TOGGLE ---
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.mobile-search-toggle');
  const searchNavBar = document.querySelector('.search-nav-bar');
  const searchBackground = document.querySelector('.search-background');

  toggleButton.addEventListener('click', () => {
    searchNavBar.classList.toggle('active');
    searchBackground.classList.toggle('active');
  });

  searchNavBar.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  searchBackground.addEventListener('click', () => {
    searchNavBar.classList.remove('active');
    searchBackground.classList.remove('active');
  });
});
