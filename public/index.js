var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();  
  request.open("GET", url); 
  request.onload = callback; 
  request.send(); 
}

var urlRequestBuilder = function(title, year = null, type = null){
  var requestUrl = 'http://www.omdbapi.com/?t=' + title + '&y=' + year + '&type=' + type;
  console.log(requestUrl);
  return requestUrl; 
}

var searchMovie = function(){
  toggleLoadingSpinner('#submit-btn', '#loading-spinner');
  var title = document.querySelector('#title-input').value;
  var year = document.querySelector('#year-selector').value;
  var type = document.querySelector('#type-selector').value;
  makeRequest(urlRequestBuilder(title, year, type), requestComplete);
}

var requestComplete = function (){
  console.log(this.response);
  if(this.status !== 404) {
    var statusIcon = document.getElementById('status-icon');
    statusIcon.className += " fa-check green";
    displayResult(JSON.parse(this.responseText));
  }
  else {
    var statusIcon = document.getElementById('status-icon');
    statusIcon.className += " fa-exclamation-triangle red"; 
    document.getElementById('r-info').innerText = 'Your search returned no results. Please try again.';
  }
  toggleLoadingSpinner('#submit-btn', '#loading-spinner');
}

var displayResult = function (response){
  document.getElementById('r-info').innerText = 
  "Title: \n" + response.Title + " \n \n Year: \n" + response.Year + "\n \n Type: \n" + response.Type + "\n \n Synopsis: \n " + response.Plot;
  var poster = document.getElementById('r-poster');
    poster.style.visibility = "visible";
    poster.src = response.Poster;
}

var populateYearDropdown = function(){
  var date = new Date().getFullYear();
  var selector = document.getElementById('year-selector');
  var i = 0; 
  do {
    var option = document.createElement("option");
    option.textContent = date - i;
    option.value = date - i;
    selector.appendChild(option);
    i++;
  } while (i < 50)
}

var toggleLoadingSpinner = function (btn, spnr){
  var button = document.querySelector(btn);
  var spinner = document.querySelector(spnr);
  button.hidden = !button.hidden;
  spinner.hidden = !spinner.hidden;
}

var app = function(){
//   var url = 'http://www.omdbapi.com/?t=' + title + '&y=' + year + '&type=' + type;
  //makeRequest(url, requestComplete);  
  populateYearDropdown();
}

window.onload = app;