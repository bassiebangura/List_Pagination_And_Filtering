//bindings used in subsequent code blocks including functions
const listOfStudents = document.querySelectorAll(".student-item");
const listOfStudentsContainer = document.querySelector("ul.student-list");
const numberOfStudentsToDisplay = 10;
const pageHeaderContainer = document.querySelector("div .page-header"); //get header container
const pageContainer = document.querySelector("body .page");

//helper function
let createAnElement = elementType => {
  //function to create HTML elements
  //takes tag as arg and returns an element
  let el;
  el = document.createElement(elementType);
  return el;
};

//create div container for searchbox and button
let searchFilterContainer = createAnElement("div");
searchFilterContainer.setAttribute("class", "student-search");

let searchFilterContainerSearchBox = createAnElement("input"); //searchFilterContainerContainer searchBox
let searchFilterContainerSearchBoxButton = createAnElement("BUTTON"); //search button
searchFilterContainerSearchBoxButton.textContent = "Search";
searchFilterContainerSearchBox.setAttribute(
  "placeholder",
  "Search for students..."
);

searchFilterContainer.appendChild(searchFilterContainerSearchBox);
searchFilterContainer.appendChild(searchFilterContainerSearchBoxButton);
pageHeaderContainer.appendChild(searchFilterContainer);

let displayPage = (list, page = 1) => {
  /*function evlautes start and end index and display  10 items within range.
    With a default page number of 1;
   */
  listOfStudentsContainer.innerHTML = " ";
  let startIndex = page * numberOfStudentsToDisplay - numberOfStudentsToDisplay;
  let endIndex = page * numberOfStudentsToDisplay - 1;

  list.forEach((item, index) => {
    if (index >= startIndex && index <= endIndex) {
      listOfStudentsContainer.appendChild(item);
    }
  });
};

let appendPageLinks = totalItems => {
  /*
   function used to generate, append, and add 
   evenListeners to the pagination buttons.
  */
  let numberOfPages = Math.ceil(totalItems.length / numberOfStudentsToDisplay);
  let paginationDivContainer = document.createElement("div");
  let paginationDivContainerUl = document.createElement("ul");

  paginationDivContainer.setAttribute("class", "pagination");
  paginationDivContainer.append(paginationDivContainerUl);
  pageContainer.appendChild(paginationDivContainer);

  //use for loop to append list items with pagination numbers to page
  for (i = 1; i <= numberOfPages; i++) {
    if (i == 1) {
      paginationDivContainerUl.innerHTML +=
        "<li><a class='active' href='#'>" + i + "</a></li>";
    } else {
      paginationDivContainerUl.innerHTML +=
        "<li><a class='' href='#'>" + i + "</a></li>";
    }
  }

  paginationDivContainer.innerHTML += "</ul>";
  let paginationListUl = document.querySelector(".pagination ul");
  let paginationListLinks = document.querySelectorAll(".pagination ul li a");

  paginationListUl.addEventListener("click", el => {
    /*add click event to paginationList 'ul' and use event bubbling
    to respond to click events on pagination list page number.
    */
    paginationListLinks.forEach(item => {
      //use .forEach to remove the 'active' class
      if (item.classList.length) {
        item.classList = " ";
      }
      if (el.target === item) {
        el.target.classList += "active"; //add active class to link element
      }
    });

    displayPage(listOfStudents, el.target.textContent);
  });
};

//capture searchButton and searchBox elements.
let searchButton = document.querySelector("button");
let searchBox = document.querySelector("input");

searchBox.addEventListener("keyup", () => {
  let searchBoxValue,
    studentName,
    i,
    txtValue,
    searchResultsArray = [];
  let paginationDivContainer = document.querySelector(".pagination");

  if (paginationDivContainer) {
    //remove if already on page else add new one base on filter results.
    pageContainer.removeChild(paginationDivContainer);
  }
  searchBoxValue = searchBox.value.toUpperCase();
  for (i = 0; i < listOfStudents.length; i++) {
    studentName = listOfStudents[i].getElementsByTagName("h3")[0];
    txtValue = studentName.textContent;
    if (txtValue.toUpperCase().indexOf(searchBoxValue) > -1) {
      searchResultsArray.push(listOfStudents[i]);
    }
  }
  displayPage(searchResultsArray);
  appendPageLinks(searchResultsArray);
});

//search button implementation
searchButton.addEventListener("click", () => {
  let searchBoxValue,
    studentName,
    i,
    txtValue,
    searchResultsArray = [];
  let paginationDivContainer = document.querySelector(".pagination");

  if (paginationDivContainer) {
    //remove if already on page else add new one base on filter results.
    pageContainer.removeChild(paginationDivContainer);
  }
  searchBoxValue = searchBox.value.toUpperCase();
  for (i = 0; i < listOfStudents.length; i++) {
    studentName = listOfStudents[i].getElementsByTagName("h3")[0];
    txtValue = studentName.textContent;
    if (txtValue.toUpperCase().indexOf(searchBoxValue) > -1) {
      searchResultsArray.push(listOfStudents[i]);
    }
  }
  displayPage(searchResultsArray);
  appendPageLinks(searchResultsArray);
});

displayPage(listOfStudents); //creates default page when js is enabled
appendPageLinks(listOfStudents); //append default page links when js is enabled.
