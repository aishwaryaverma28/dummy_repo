const arr = [];
const index = 0;
//query selector
const inpName = document.querySelector(".name");
console.log(inpName.value);
const panNo = document.querySelector(".pan_no").value;
const age = document.querySelector(".age").value;
const highestQualification = document.querySelector(".high_quali").value;
const sorting = document.querySelector("#sort_array");
const search = document.querySelector(".search");
const submitBtn = document.querySelector(".submit_btn");
const container = document.querySelector(".container");
//function

function createListItem({name,pan,age,quali})
{
   const Div = document.createElement("div");
   Div.setAttribute("class", itemDiv);
   Div.innerHTML=`<h3 class="name">${name}</h3><h2 class="pan">${pan}</h2><p class="age">${age}</p><p class="qualification">${highestQualification}</p><button class="btn del-btn">Delete</button>`
   container.appendChild(Div);
}
function addItem(event)
{
event.preventDefault();
const details = {
    id : index,
    name : inpName.value,
    pan : panNo.value,
    age : age.value,
    education : highestQualification.value
};
console.log(details);
createListItem(details);
index++;

}

//event listener
//form add button event listener
submitBtn.addEventListener("submit",addItem);