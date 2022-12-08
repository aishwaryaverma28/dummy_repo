let arr = [];// array to store candidates info in form of object
let count = 0;// to assign new id to each object
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
    <td>${inputObj.age}</td>
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
 console.log(event);
  event.path[2].remove();
  arr.forEach((ele,index)=>{
    if(parseInt(event.path[2].id) == ele.id){
       arr.splice(index,1);
    }
  })
 localStorage.setItem("details",JSON.stringify(arr));
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