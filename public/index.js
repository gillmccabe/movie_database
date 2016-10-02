var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();  
  request.open("GET", url); 
  request.onload = callback; 
  request.send(); 
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

var searchMovie = function(){
  toggleLoadingSpinner('#submit-btn', '#loading-spinner');
  var title = document.querySelector('#title-input').value;
  var year = document.querySelector('#year-selector').value;
  var type = document.querySelector('#type-selector').value;
  makeRequest(urlRequestBuilder(title, year, type), requestMovieComplete);
}

var urlRequestBuilder = function(title, year = null, type = null){
  var requestUrl = 'http://www.omdbapi.com/?t=' + title + '&y=' + year + '&type=' + type;
  console.log(requestUrl);
  return requestUrl; 
}

var requestMovieComplete = function (){
  console.log(this.response);
  if(this.response.Response == "False") {
    statusIcon.className += " fa-exclamation-triangle red"; 
  }
  else{
    var statusIcon = document.getElementById('status-icon');
    statusIcon.className += " fa-check green";
    displayResult(JSON.parse(this.responseText));
  }
  toggleLoadingSpinner('#submit-btn', '#loading-spinner');
}

var displayNoResult = function (){
  document.getElementById('r-info').textContent = 'No result';
  document.getElementById('r-poster').style.visibility = 'hidden';
}

var displayResult = function (response){
  document.getElementById('r-info').innerText = 
  "Title: \n" + response.Title + " \n \n Year: \n" + response.Year + "\n \n Type: \n" + response.Type + "\n \n Synopsis: \n " + response.Plot;
  var poster = document.getElementById('r-poster');
  if(response.Poster == "N/A"){
    poster.style.visibility = "hidden";
  }
  else{
    poster.style.visibility = "visible";
    poster.src = response.Poster;
  }
}

var toggleLoadingSpinner = function (btn, spnr){
  var button = document.querySelector(btn);
  var spinner = document.querySelector(spnr);
  button.hidden = !button.hidden;
  spinner.hidden = !spinner.hidden;
}

var app = function(){
  var url = "http://hp-api.herokuapp.com/api/characters";
  //makeRequest(url, requestComplete);  
  populateYearDropdown();
}

window.onload = app;