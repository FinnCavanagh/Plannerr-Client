$(init);


// var currentUser = null;

function init(){

  $("#container").on("submit", ".submit-group-form", submitGroupForm);
  $("#container").on("submit", ".activity_form", submitActivityForm);
  $("#container").on("click", ".go-to-group-page", getSelectedGroup);
  $(".add-new-group").on("click", newGroupForm);
  $(".view-profile-page").on("click", renderUserProfileView);
  // Gareth Adding activity render
  $("#container").on("click", ".add-activity", newActivityForm);
  // End Gareth Adding Activity render
}

function renderUserProfileView(){
  var user = getUser();
  ajaxRequest("get", "https://plannerr-api.herokuapp.com/api/users/" + user.id, null, function(res){
    event.preventDefault();
    console.log("rendering view profile");
    Views.render("/templates/user_page.html", res, "#container");
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
  $('.nav-wrapper img').attr('src', user.profile_picture);

}

function loggedOutState(){
  console.log("logged out")

}
function newGroupForm(){
  event.preventDefault();
  Views.render("/templates/add_group.html", null, "#container");
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
  ajaxRequest("POST", 'https://plannerr-api.herokuapp.com/api/groups', data, authenticationSuccessful);
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
    var url    = "https://plannerr-api.herokuapp.com/api" + $(this).attr("action");
    var data   = $(this).serialize();



    ajaxRequest(method, url, data, displayCurrentGroup);
    // console.log(data);
    // console.log(currentUser.groups);
    // // currentUser.groups.push(data._id);
    // console.log(currentUser.groups);
}

function submitActivityForm(){
  event.preventDefault();

  var method = $(this).attr("method");
  var url    = "https://plannerr-api.herokuapp.com/api" + $(this).attr("action");
  var data   = $(this).serialize();

  ajaxRequest(method, url, data, displayCurrentActivity);
}

function getAppFriends(){

}

function addUsersToGroup(){

}

function getActivities(){
//get a groups activities
}

function displayCurrentActivity(data){
  console.log("data is", data)
  //display group info
  
  ajaxRequest("get", "https://plannerr-api.herokuapp.com/api/groups/"+data.activity._id, null, function(res){
    console.log(res)
    Views.render("/templates/activity_page.html", res, "#container");
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

function getSelectedGroup(){
  console.log("here");
  event.preventDefault();
  // return ajaxRequest("get", "http://localhost:3000/api/groups"+ )
}

function displayCurrentGroup(data){
  console.log("data is", data)
  //display group info
  
  ajaxRequest("get", "https://plannerr-api.herokuapp.com/api/groups/"+data.group._id, null, function(res){
    console.log(res);
    Views.render("/templates/group_page.html", res, "#container");
  });
  // Views.renderCollection("")
  // getActivities()
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
