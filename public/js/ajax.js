$(init);

var currentUser = null;

function init(){

  $("#container").on("submit", ".submit-group-form", submitGroupForm);
  $(".add-new-group").on("click", newGroupForm);
  $(".view-profile-page").on("click", renderUserProfileView);
  // Gareth Adding activity render
  $("#container").on("click", ".add-activity", newActivityForm);
  // End Gareth Adding Activity render
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
  var profile_picture = localStorage.getItem("profile_picture");
  $('.nav-wrapper img').attr('src', profile_picture);
  // getUsersGroups();
  ///THIS IS IMPORTANT 4 GERRY
  console.log(currentUser);
  // var currentUser = 

//set view for logged in
}

function loggedOutState(){
  console.log("logged out")
}


// gareth added newActivityForm function
function newActivityForm(){
  event.preventDefault();
  Views.render("/templates/add_activity.html", null, "#container");
}

function newGroupForm(){
  event.preventDefault();
  Views.render("/templates/add_group.html", null, "#container");
}

function onGroupCreate(){
  ajaxRequest("POST", 'http://localhost:3000/api/groups', data, authenticationSuccessful);
}


function showUsersGroups(data) {
  console.log("users group")
   //chuck in the activity and profile stuff
  // return $.each(data.groups, function(index, group){
  //   $.groups
  // })
  // show all user groups using underscore rendering
}

function submitGroupForm(){
    event.preventDefault();

    var method = $(this).attr("method");
    var url    = "http://localhost:3000/api" + $(this).attr("action");
    var data   = $(this).serialize();



    ajaxRequest(method, url, data, displayCurrentGroup);
    // console.log(data);
    // console.log(currentUser.groups);
    // // currentUser.groups.push(data._id);
    // console.log(currentUser.groups);
}

function submitActivityForm(){
  event.preventDefault();
  console.log("logging button click for activity");

}

function getAppFriends(){

}

function addUsersToGroup(){

}

function getActivities(){
//get a groups activities
}

function displayActivities(data){
//diaplay group activities underneth group header
}

function getUsersInGroup(){
//get all friends in group
}

function displayUsersInGroup(data){
//to show friends inside group
}

function getCurrentGroup(){
  return ajaxRequest("get", "http://localhost:3000/api/groups", null, function(){
    
  })
}


function displayCurrentGroup(data){
  
  //display group info
  console.log(data)
  getActivities()
}

function voteOnActivity(){
//user vote on activity
//click once for vote, twice to cancel
}


// function voting (data) {
//   $(document.body).on('click', function(e));
//  console.log ("finn is logging", activity._id);
// };


//on click, update activity_id and user_id

//   event.preventDefault();
//   users_voted: [{ user_id : mongoose.Schema.Types.ObjectId , type: String }],
// user_id: [{type: mongoose.Schema.ObjectId, ref: 'User'}]

function commentOn(){
//add comment to activity
}

function instantMessageOn(){
//trigger instant message app
}

function instantMessageOff(){

}

function displayErrors(data){
//show any errors that come up on the app
}

function authenticationSuccessful(data) {
  currentUser = data.user;
  localStorage.setItem("profile_picture", data.user.profile_picture);
  localStorage.setItem("first_name", data.user.first_name);

  setToken(data.token);
  checkLoginState();
}

function setRequestHeader(xhr, settings) {
//for the token so we can see things that require a token
  var token = getToken();
  if(token) xhr.setRequestHeader('Authorization', 'Bearer ' + token);
}

function setToken(token) {
  return localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
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


