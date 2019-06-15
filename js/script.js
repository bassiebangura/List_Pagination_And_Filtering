/*********************************************************************
 dynamically add search feature with search box and search buton

**********************************************************************/
let pageHeaderContainer = document.querySelector("div .page-header"); //get header container

//implement search feature using search box.
// let arrayListOfStudentNames = Array.from(
//   document.querySelectorAll(".student-details h3"),
//   studentName => studentName.textContent
// );
//console.log("These are the students:", arrayListOfStudentNames);

// let searchFeature = () => {
//   let inputBoxValue, studentName, i, txtValue;
//   inputBoxValue = inputBox.value.toUpperCase();
//   for (i = 0; i < listOfStudents.length; i++) {
//     //console.log(list[i])
//     studentName = listOfStudents[i].getElementsByTagName("h3")[0];
//     //console.log(studentName)
//     txtValue = studentName.textContent;
//     console.log(txtValue);
//     console.log(inputBoxValue);
//     if (txtValue.toUpperCase().indexOf(inputBoxValue) > -1) {
//       listOfStudents[i].style.display = "";
//     } else {
//       listOfStudents[i].style.display = "none";
//     }
//   }
// };

//creating div to container searchbox and button
let searchStudent = document.createElement("div");
searchStudent.setAttribute("class", "student-search");

let searchStudentInputBox = document.createElement("input"); //search inputbox
let searchStudentButton = document.createElement("BUTTON"); //search button
searchStudentButton.textContent = "Search";
searchStudentInputBox.setAttribute("placeholder", "Search for students...");

searchStudent.appendChild(searchStudentInputBox);
searchStudent.appendChild(searchStudentButton);
pageHeaderContainer.appendChild(searchStudent);

/********************************************************************
 * Display 10 students per page based on pagination number clicked
 *
 ********************************************************************/
const listOfStudents = document.querySelectorAll(".student-item");
const numberOfStudentsToDisplay = 10;

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
let appendPageLinks = list => {
  //append links to page based on length of list
  let numberOfPages = Math.ceil(list.length / numberOfStudentsToDisplay);
  let pageContainer = document.querySelector("body .page");
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
  // <div class="pagination">
  //      <ul>
  //        <li>
  //          <a class="active" href="#">1</a>
  //        </li>
  //         <li>
  //          <a href="#">2</a>
  //        </li>
  //         <li>
  //          <a href="#">3</a>
  //        </li>
  //         <li>
  //          <a href="#">4</a>
  //        </li>
  //         <li>
  //          <a href="#">5</a>
  //        </li>
  //      </ul>
  //    </div>
};

//add eventlistener to search box;
let inputBox = document.querySelector("input");
inputBox.addEventListener("keyup", () => {
  let inputBoxValue, studentName, i, txtValue;
  inputBoxValue = inputBox.value.toUpperCase();
  for (i = 0; i < listOfStudents.length; i++) {
    //console.log(list[i])
    studentName = listOfStudents[i].getElementsByTagName("h3")[0];
    //console.log(studentName)
    txtValue = studentName.textContent;
    console.log(txtValue);
    console.log(inputBoxValue);
    if (txtValue.toUpperCase().indexOf(inputBoxValue) > -1) {
      listOfStudents[i].style.display = "";
    } else {
      listOfStudents[i].style.display = "none";
    }
  }
  const filterListOfStudents = document.querySelectorAll(".student-item");
  //document.querySelector("pagination");
  //appendPageLinks(filterListOfStudents);
}); //() => console.log("hello"))//);

displayPage(listOfStudents, 1); //default page is number 1
appendPageLinks(listOfStudents); //call function to add pagination numbers
