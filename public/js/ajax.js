$(init);


// var currentUser = null;

function init(){

  $("#container").on("submit", ".submit-group-form", submitGroupForm);
  $("#container").on("submit", ".activity_form", submitActivityForm);
  $("#container").on("click", ".go-to-group-page", clickGroupPage);
  $(".add-new-group").on("click", newGroupForm);
  $(".view-profile-page").on("click", renderUserProfileView);
  // cheatTheSystem();

  // Gareth Adding activity render
  $("#container").on("click", ".add-activity", newActivityForm);
  // End Gareth Adding Activity render
}

function renderUserProfileView(){
  var user = getUser();
  ajaxRequest("get", "https://plannerr-api.herokuapp.com/api/users/" + user.id, null, function(res){
    event.preventDefault();
    console.log("rendering view profile");
    Views.render("./templates/user_page.html", res, "#container");
  })
}

function checkIfAdmin(){
//checks to see if  a user is admin
}

function checkLoginState(){
  if (getToken()) {
    return loggedInState();
  } else {
    return loggedOutState();
  }
}
//check a token to confirm logged in or out

function loggedInState(){
  //maybe slap this on the page
  console.log("you logged in");

  var user = getUser();
  $('.nav-wrapper .facebook-img').attr('src', user.profile_picture);

}

function loggedOutState(){
  console.log("logged out")

}


function getUserByID(){
  event.preventDefault();
  var usersAsObject = [];

  group.users.forEach(user, function(){
    return ajaxRequest("get", "https://plannerr-api.herokuapp.com/api/user"+ user, null, function(){
      usersAsObject.push(user)
    })
  })
}
// gareth added newActivityForm function
function newActivityForm(){
  event.preventDefault();
  Views.render("./templates/add_activity.html", null, "#container", initAutocomplete);
}

function newGroupForm(){
  event.preventDefault();
  Views.render("./templates/add_group.html", null, "#container");
}

function onGroupCreate(){
  ajaxRequest("POST", 'https://plannerr-api.herokuapp.com/api/groups', data, authenticationSuccessful);
}


function submitGroupForm(){
    event.preventDefault();

    var method = $(this).attr("method");
    var url    = "https://plannerr-api.herokuapp.com/api" + $(this).attr("action");
    var data   = $(this).serialize();



    ajaxRequest(method, url, data, displayCurrentGroup);

}

function clickGroupPage(){

    event.preventDefault();
    ajaxRequest("get", "https://plannerr-api.herokuapp.com/api/groups/" + $(this).attr("name"), null, displayCurrentGroup);

}

function submitActivityForm(){
  console.log("here");
  event.preventDefault();
  console.log("submitted activity");
  var method = $(this).attr("method");
  var url    = "https://plannerr-api.herokuapp.com/api" + $(this).attr("action");
  var data   = $(this).serialize();

  ajaxRequest(method, url, data, displayCurrentActivity);
}



function cheatTheSystem(){
  return ajaxRequest("PUT", "https://plannerr-api.herokuapp.com/api/groups/565758625f9ebe03005df38c", {"users": ["565755395f9ebe03005df389", "565756b35f9ebe03005df38a", "565778841fb54e0300765846", "565745fbbf659303002380ae"]}, function(){

  })
}

function displayGroup(group){
  if(group){
    return group.name

  } else {
    return "No group yet"
  }
}

function groupIdToGroupPage(group){
  if(group){
    return group._id
  } else {
    return null
  }
}



function displayCurrentActivity(data){

  //display group info
  
  ajaxRequest("get", "https://plannerr-api.herokuapp.com/api/groups/"+data.activity._id, null, function(res){

    Views.render("./templates/activity_page.html", res, "#container");
  });
  // Views.renderCollection("")
  // getActivities()
}

function getUsersInGroup(){
//get all friends in group
}

function displayUsersInGroup(data){
//to show friends inside group
}

function getCurrentGroup(){
  return ajaxRequest("get", "https://plannerr-api.herokuapp.com/groups", null, function(){
    
  })
}



function displayCurrentGroup(data){
  console.log("data is", data)

  //display group info
  
  ajaxRequest("get", "https://plannerr-api.herokuapp.com/api/groups/"+data.group._id, null, function(res){
    console.log(res);
    // getUserByID();
    Views.render("./templates/group_page.html", res, "#container");

  });
  // Views.renderCollection("")
  // getActivities()
}



function authenticationSuccessful(data) {
  setData(data);
  renderUserProfileView(data.user);
  checkLoginState();
}

function setRequestHeader(xhr, settings) {
//for the token so we can see things that require a token
  var token = getToken();
  if(token) xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

function setData(data) {
  localStorage.setItem("profile_picture", data.user.profile_picture);
  localStorage.setItem("first_name", data.user.first_name);
  localStorage.setItem("user_id", data.user._id);
  return localStorage.setItem("token", data.token);
}

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  return {
    id: localStorage.getItem("user_id"),
    first_name: localStorage.getItem("user_id"),
    profile_picture: localStorage.getItem("profile_picture")
  };
}

function removeToken() {
  localStorage.clear();
}


function ajaxRequest(method, url, data, callback) {
  return $.ajax({
    method: method,
    url: url,
    data: data,
    beforeSend: setRequestHeader
  }).done(function(data){
    console.log("ajaxRequestReturn", data);
    callback(data);
  }).fail(function(data) {
    displayErrors(data.responseJSON.message);
  });
}



//make a button, on click, make a request to update the activity and add user.id (current) into the users-voted attribute of the activity model 
//create a html element, to display / show the length of the collection users-voted
//tick is a click event, changes when clicked
//counter is there when the page reloads - always
