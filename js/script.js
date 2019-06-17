const listOfStudents = document.querySelectorAll(".student-item");
const listOfStudentsContainer = document.querySelector("ul.student-list");
const numberOfStudentsToDisplay = 10;
let pageHeaderContainer = document.querySelector("div .page-header"); //get header container
let pageContainer = document.querySelector("body .page");



//function to create elements
let createAnElement = elementType => {
  //takes tag as arg and return created element
  let el;
  el = document.createElement(elementType);
  return el;
};
//creating div to container searchbox and button
let searchStudent = createAnElement("div"); //document.createElement("div");
searchStudent.setAttribute("class", "student-search");

let searchStudentsearchBox = createAnElement("input"); //search searchBox
let searchStudentButton = createAnElement("BUTTON"); //search button
searchStudentButton.textContent = "Search";
searchStudentsearchBox.setAttribute("placeholder", "Search for students...");

searchStudent.appendChild(searchStudentsearchBox);
searchStudent.appendChild(searchStudentButton);
pageHeaderContainer.appendChild(searchStudent);

/********************************************************************
 * Display 10 students per page based on pagination number clicked
 *
 ********************************************************************/

//console.log(listOfStudents);

let displayPage = (list, page) => {
  /*function evlautes start and end index from list
   for items and display items within range.
   */
  const listOfStudentsContainer = document.querySelector("ul.student-list");
  listOfStudentsContainer.innerHTML = " ";
  let startIndex = page * numberOfStudentsToDisplay - numberOfStudentsToDisplay;
  let endIndex = page * numberOfStudentsToDisplay;

  list.forEach((item, index) => {
    if (index >= startIndex && index <= endIndex - 1) {
      // console.log(index);
      // console.log(item);
      listOfStudentsContainer.appendChild(item);
    }
  });
};

/*********************************************************************** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
************************************************************************/
console.log(document.getElementsByClassName("pagination"));
let appendPageLinks = (totalItems) => {
  
  //append links to page based on length of list
  let numberOfPages = Math.ceil(totalItems.length / numberOfStudentsToDisplay);
  let paginationDivContainer = document.createElement("div");
  let paginationDivContainerUl = document.createElement("ul");

  //console.log("number of pages is:", numberOfPages);//for debugging

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
      //console.log(i);//for debugging
    }
  }

  paginationDivContainer.innerHTML += "</ul>";
  let paginationListUl = document.querySelector(".pagination ul");
  let paginationListLinks = document.querySelectorAll(".pagination ul li a");
  //add click event to paginationList 'ul' and using event bubbling
  //to respond to click events on pagination list page numbers.
  paginationListUl.addEventListener("click", el => {
    //use .forEach to remove the 'active' class
    paginationListLinks.forEach(item => {
      console.log(item.classList);
      if (item.classList.length) {
        item.classList = " ";
      }
    });

    //console.log(el);
    console.log(el.target.classList);
    el.target.classList += "active";
    console.log(el.target.textContent);
    displayPage(listOfStudents, el.target.textContent);
  });
};

//add eventlistener to search box;
let searchButton = document.querySelector("button");
let searchBox = document.querySelector("input");
searchBox.addEventListener("keyup", () => {
  let searchBoxValue, studentName, i, txtValue, paginationNum = 0, searchResultsArray = [];
  //listOfStudentsContainer.innerHTML = " ";
  //displayPage(listOfStudents);
  let paginationDivContainer = document.querySelector(".pagination")
  console.log(paginationDivContainer);
  if(paginationDivContainer) {
    pageContainer.removeChild(paginationDivContainer)
  }
  searchBoxValue = searchBox.value.toUpperCase();
  for (i = 0; i < listOfStudents.length; i++) {
    //console.log(list[i])
    studentName = listOfStudents[i].getElementsByTagName("h3")[0];
    //console.log(studentName)
    txtValue = studentName.textContent;
    //console.log(txtValue);
    //console.log(searchBoxValue);
    if (txtValue.toUpperCase().indexOf(searchBoxValue) > -1) {
      //listOfStudents[i].style.display = "";
      //paginationNum += 1;
      searchResultsArray.push(listOfStudents[i])
      //console.log(searchResultsArray)
      //console.log(paginationNum)
    } 
    
  }
  displayPage(searchResultsArray, 1)
  appendPageLinks(searchResultsArray);
}); 

displayPage(listOfStudents, 1)
appendPageLinks(listOfStudents);













//search button implementation
searchButton.addEventListener("click", () => {
  let searchBoxValue, studentName, i, txtValue, searchResultsArray;
  searchBoxValue = searchBox.value.toUpperCase();
  for (i = 0; i < listOfStudents.length; i++) {
    //console.log(list[i])
    studentName = listOfStudents[i].getElementsByTagName("h3")[0];
    //console.log(studentName)
    txtValue = studentName.textContent;

    if (txtValue.toUpperCase().indexOf(searchBoxValue) > -1) {
      listOfStudents[i].style.display = "";
      searchResultsArray.push(listOfStudents[i])
      console.log(searchResultsArray)
    } else {
      listOfStudents[i].style.display = "none";
    }
  }
  // let filteredListOfStudents = document.querySelectorAll(".student-item");
  // console.log("hello");
  // console.log(filteredListOfStudents);*9+-*6
  // console.log(filteredListOfStudents.length);
  // appendPageLinks(filteredListOfStudents);
  //document.querySelector("pagination");
  //appendPageLinks(filterListOfStudents);
  //1. add all students whose name meet criteria to student-list container.
  //2. call pagination on your results
});
//displayPage(listOfStudents, 1); //default page is number 1
//appendPageLinks(listOfStudents); //call function to add pagination numbers
