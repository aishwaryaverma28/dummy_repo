let arr = [];// array to store candidates info in form of object
let count = 0;// to assign new id to each object
//query selector
const inpName = document.querySelector('.name');
const panNo = document.querySelector('.pan_no');
const age = document.querySelector('.age');
const highestQualification = document.querySelector('.high_quali');
const sorting = document.querySelector('#sort_array');
const search = document.querySelector('.search');
const submitBtn = document.querySelector('.submit_btn');
const container = document.querySelector('.container');
const inputForm = document.querySelector('.candidate_data');
//function

// Load previous info from local storage
window.addEventListener('load', function () {// load is event which take place whenever web page reloads itself6yjm
  
  arr = JSON.parse(localStorage.getItem('arr'))??[];//get item from local storage and store in the array
  container.innerHTML = '';
  
  for (let i = 0; i < arr.length; i++) {
    // to store each object in HTML doc/;
    container.innerHTML += `
   <div class="itemDiv" data-id="${arr[i].id}">
    <h2 class="name">${arr[i].name}</h2>
    <h3 class="pan">${arr[i].pan}</h3>
    <p class="age">${arr[i].age}</p>
    <p class="qualification">${arr[i].qual}</p>
    <button class="btn del-btn">Delete</button>
    <button class="btn edit-btn">Edit</button>
  </div>`;
  }
});
function addHtmlElement(arr) {
  
}
// create new user info
function createUser(e) {
  e.preventDefault();
  // to prevent from form automatic submition and page reloading feture of submit button
  const myHTML = `
  <div class="itemDiv" data-id="${count}">
    <h2 class="name">${inpName.value}</h2>
    <h3  class="pan">${panNo.value}</h3>
    <p class="age">${age.value}</p>
    <p class="qualification">${highestQualification.value}</p>
    <button class="btn del-btn">Delete</button>
    <button class="btn edit-btn">Edit</button>
  </div>
  `;
  //created a new html element of new user
  const myFragment = document.createRange().createContextualFragment(myHTML);
  //create fragment of above html element
  container.appendChild(myFragment);
  //insert the fragment into container div
  
  const data = {
    name: inpName.value,
    pan: panNo.value,
    age: age.value,
    qual: highestQualification.value,
    id: count++,
  };
  //create an object to push into an array and local storage
  arr.push(data);
  localStorage.setItem('arr', JSON.stringify(arr));
  inputForm.reset();
  //to automatically empty the form
}

//delete user info
function deleteUser(e) {
  arr.forEach((item, index) => {
    //to find for candidate who have same id as the id of targeted candidate
    if (e.target.parentElement.dataset.id == arr[index].id) {
      arr.splice(index, 1);
      //removed from array
      e.target.parentElement.remove();
      //remove from html doc
    }
  });
  //update local storage
  localStorage.setItem('arr', JSON.stringify(arr));
}
//for sorting data according to user choice
//if ascending order is selected(i.e. A to Z sorting)
function ascending(){
arr.sort(function (a, b){
if(a.name < b.name)
return -1;
if(a.name > b.name)
return 1;
return 0;
});
}

//if decending order is selected(i.e. Z to A sorting)
function decending(){
    arr.sort(function (a, b){
    if(a.name > b.name)
    return -1;
    if(a.name < b.name)
    return 1;
    return 0;
    });
}
    
function sortedArray(e){
    container.innerHTML = '';
    //empty the conatainer div so as to place new elements
    for (let i = 0; i < arr.length; i++) {
        // to store each object in HTML doc/;
        container.innerHTML += `
       <div class="itemDiv" data-id="${arr[i].id}">
        <h2 class="name">${arr[i].name}</h2>
        <h3 class="pan">${arr[i].pan}</h3>
        <p class="age">${arr[i].age}</p>
        <p class="qualification">${arr[i].qual}</p>
        <button class="btn del-btn">Delete</button>
        <button class="btn edit-btn">Edit</button>
      </div>`;
      }
}








//event listeners
//event trigger for submit button of form
inputForm.addEventListener('submit', createUser);
//event trigger for delete button in below list
container.addEventListener('click', deleteUser);
//event trigger for sort drop down box
sorting.addEventListener('change', function(event){
    event.preventDefault();
    //sorting done according to user selection
    if(sorting.value ==="A-Z")
    {
        ascending();
        sortedArray();
    }
    if(sorting.value === "Z-A")
    {
        decending();
        sortedArray();
    }
})
