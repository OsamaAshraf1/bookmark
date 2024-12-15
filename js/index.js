var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById('siteUrl');
var searchInput = document.getElementById("searchInput");

var state = document.querySelector(".state");
let box = document.querySelector('.box');
let btnClose = document.querySelector(".close");

var allSites = [];

if(localStorage.getItem("websitContainer") !== null){
  allSites = JSON.parse(localStorage.getItem("websitContainer"));
  displayData();
}

function addWebsite(){
  // if(validationName() === true)

  if(allValidation(siteNameInput, 'msgName') && allValidation(siteUrlInput, 'msgUrl')){
    
    var website = {
      name: siteNameInput.value,
      url: siteUrlInput.value
    }
    allSites.push(website);
    console.log(allSites);
    
    localStorage.setItem("websitContainer", JSON.stringify(allSites))
    displayData();
    clearForm();
  }
  else{
    state.classList.remove("d-none");
  }
  
}

function clearForm(){
  siteNameInput.value = null;
  siteUrlInput.value = null;

  siteNameInput.classList.remove('is-valid');
  siteUrlInput.classList.remove('is-valid');
}

function displayData(){
  var cartona = "";
  for(var i = 0; i < allSites.length; ++i){
    cartona += CreateColsHtml(i)
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function searchData(){
  var term = searchInput.value;
  var cartona = "";
  for(var i = 0; i < allSites.length; ++i){
    if(allSites[i].name.toLowerCase().includes( term.toLowerCase() ) === true){
      cartona += CreateColsHtml(i);
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function CreateColsHtml(iii){
  return `
      <tr>
        <td scope="row">${iii}</td>
        <td scope="row">${allSites[iii].name}</td>
        <td scope="row"> <button onclick=visitSite(${iii}) class="btn btn-outline-success btn-sm">Visit</button></td>
        <td scope="row"> <button  onClick=deleteSite(${iii}) class="btn btn-outline-danger btn-sm">Delete</button></td>
    </tr>
    `
  };

function visitSite(index){
  window.open(allSites[index].url, "_blank")
  localStorage.setItem("websitContainer", JSON.stringify(allSites))
  displayData();
}

function deleteSite(index){
  allSites.splice(index, 1);
  localStorage.setItem("websitContainer", JSON.stringify(allSites))
  displayData();
}

// solution one

// function validationName(){
//   var regux = /^[a-zA-Z][a-zA-Z0-9 ]{2,19}$/;
//   var text = siteNameInput.value;
//   var msgName = document.getElementById('msgName'); // alert
//   if(regux.test(text)){
//     siteNameInput.classList.add("is-valid");
//     siteNameInput.classList.remove("is-invalid");
//     msgName.classList.add("d-none")
//     return true;
//   }
//   else{
//     siteNameInput.classList.add("is-invalid");
//     siteNameInput.classList.remove("is-valid");
//     msgName.classList.remove("d-none");
//     return false;
//   }
// }

//solution two 

function allValidation(element, msgId){
  var text = element.value;
  var regux = {
    siteName: /^[a-zA-Z][a-zA-Z0-9 ]{2,19}$/,
    siteUrl: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
  }
  var msg = document.getElementById(msgId); // alert
  if(regux[element.id].test(text) == true){
    console.log("match");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  }
  else{
    // console.log("nomatch");
    element.classList.add("is-invalid"); //Specificty is-invalid strong from is-valid
    element.classList.remove("is-valid"); 
    msg.classList.remove("d-none");
    return false;
  }
}


function closeSlide(){
  state.classList.add("d-none"); // Hide lightContainer
}
btnClose.addEventListener('click', function(){
  closeSlide();
})
state.addEventListener('click', function(){
  closeSlide();
})