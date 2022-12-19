let arr = [];// array to store candidates info in form of object
let count = 0;// to assign new id to each object
let name,pan,canAge,education;
//============================================================query selector===========================================================================
const sorting = document.querySelector('#sort_array');
const search = document.querySelector('.search');
const inpName = document.querySelector('.name');
const panNo = document.querySelector('.pan_no');
const age = document.querySelector('.age');
const highestQualification = document.querySelector('.high_quali');
const submitBtn = document.querySelector('.submit_btn');
const inputForm = document.querySelector('.candidate_data');
const errorInput = document.querySelector(".error_input");
const searchAndSort = document.querySelector(".search_and_sort");
const closeIcon = document.querySelector(".fa-xmark");
const tableBody = document.querySelector('#table_body');
//=================================================================function===========================================================================

//================================================== Load previous info from local storage=============================================================
// window.addEventListener('load', function () {// load is event which take place whenever web page reloads itself
  arr = JSON.parse(localStorage.getItem('arr'))??[];//get item from local storage and store in the array
  arr.map((ele)=>{
    addHtmlElement(ele);
  });
//===================================================== to store each object in HTML doc===============================================================
function addHtmlElement(inputObj)
{
  const tableRow = document.createElement("tr");
  tableRow.setAttribute("class","personDetails");
  tableRow.setAttribute("id",inputObj.id);
  tableRow.innerHTML = `
    <td>${inputObj.name}</td>
    <td class="pan">${inputObj.pan}</td>
    <td>${inputObj.canAge}</td>
    <td>${inputObj.edu}</td>
    <td>
      <button class="del-btn btn">Delete</button>
      <button class="edit-btn btn">Edit</button>
    </td>`;
  tableBody.appendChild(tableRow);
   // console.log(tableBody.innerHTML);
}

function createHtml(event){
  event.preventDefault();
  if(event.target.value == "Save")
  {
    saveUpdate(event,inpName.value, panNo.value, age.value, highestQualification.value);
  }
  else{
    if(inpName.value=="" || panNo.value=="" || age.value=="" || highestQualification.value=="")
    {
       errorInput.innerText="Enter your Detail";
       setTimeout(()=>errorInput.innerText="",2000);
    }
    else{
      const inputObj = {
        name: inpName.value,
        pan: panNo.value,
        canAge: age.value,
        edu: highestQualification.value,
        id: count++
      };
      arr.push(inputObj);
      localStorage.setItem("arr", JSON.stringify(arr));
      addHtmlElement(inputObj);
      inputForm.reset();
    }
  }
}
function deleteRow(event)
{
 console.log(arr);
  event.path[2].remove();
  arr.forEach((ele,index)=>{
    if(parseInt(event.path[2].id) == ele.id){
       arr.splice(index,1);
    }
  })
 localStorage.setItem("arr",JSON.stringify(arr));
}


//========================================================================edit row==================================================================
function editRow(event){
  console.log(event);
  name = event.path[2].childNodes[1];
  pan = event.path[2].childNodes[3];
  canAge = event.path[2].childNodes[5];
  education = event.path[ 2].childNodes[7];
  inpName.value = name.textContent;
  panNo.value = pan.textContent;
  age.vale = canAge.textContent;
  highestQualification.value = education.textContent;
  submitBtn.value = "Save";
}

//=========================================================================save and update value==========================================================
function  saveUpdate(event,nameTxt, panTxt, ageTxt, eduTxt)
{
  //console.log(name);
  name.textContent = nameTxt;
  pan.textContent = panTxt;
  canAge.textContent = ageTxt;
  education.textContent = eduTxt;
  submitBtn.value = "Add";
// update the array
arr.forEach((ele,index)=>{
  if(event.path[2].id==ele.id){
     ele.name = nameTxt;
     ele.pan = panTxt;
     ele.age = ageTxt;
     ele.edu = eduTxt;
  }
})
localStorage.setItem("arr",JSON.stringify(arr));
// console.log(inputDetailArr)

inputForm.reset();
}
//=======================================================================sort function===================================================================
function filterData(event){
tableBody.innerHTML= "";
let temp;
if(event.target.value == "normal")
temp = arr.sort((a,b)=>a.id - b.id);
else if(event.target.value == "A-Z")
temp = arr.sort((a,b)=>a.name > b.name ? 1 : -1);
else if(event.target.value == "Z-A")
temp = arr.sort((a,b)=>a.name > b.name ? -1 : 1);
temp.forEach(ele => {
  addHtmlElement(ele);
})
}
//========================================================================search function================================================================
function searchData(event){
tableBody.innerHTML = "";
 let input = arr.filter((ele)=>{
  if(ele.pan.includes(search.value))
  return ele
 })
 if (input.length !== 0)
 {
  input.map((ele)=>{
    addHtmlElement(ele);
  })
 }
 else
 tableBody.innerHTML=`<div class="search error">PAN NUMBER NOT FOUND</div`
}
//========================================================================event listeners=================================================================
//form submit event listner
submitBtn.addEventListener("click", createHtml);
// edit and delete event listner
tableBody.addEventListener("click",(event)=>{
  //console.log(event);
  if(event.target.classList.contains("del-btn"))
   {
    deleteRow(event);
    }
  else if(event.target.classList.contains("edit-btn"))
    {
      editRow(event);
    }

})




//for search and sort data according to user choice

searchAndSort.addEventListener("click",(event)=>{
  event.preventDefault();
  if(event.target.classList.contains("sort_array")){
    filterData(event);
  }
  else if(event.target.classList.contains("search")){
    search.addEventListener("input", searchData);
  }
})  