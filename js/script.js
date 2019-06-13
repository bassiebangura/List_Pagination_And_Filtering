/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
const listOfStudents = document.querySelectorAll(".student-item");
const numberOfStudentsToDisplay = 10;
console.log(listOfStudents);
console.log(typeof listOfStudents);

let displayPage = (list, page) => {
  /*function evlautes start and end index from list
   for items and display items within range.
   */
  const listOfStudentsContainer = document.querySelector("ul.student-list");
  listOfStudentsContainer.innerHTML = " ";
  let startIndex = page * numberOfStudentsToDisplay - numberOfStudentsToDisplay;
  let endIndex = page * numberOfStudentsToDisplay;

  list.forEach((item, index) => {
    if (index >= startIndex && index <= endIndex) {
      console.log(index);
      console.log(item);
      listOfStudentsContainer.appendChild(item);
    }
  });
};

displayPage(listOfStudents, 1);

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
