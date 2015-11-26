$(function(){
  // Facebook login
  var $fbLogin = $('.fb-login');
  var $fbLogout = $('.fb-logout');
  // initialize facebook 
  FB.init({
    appId      : '1389788894661209', //process.env.PLANNERR_FACEBOOK_API_KEY,
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
  });


  function checkLoginStatus(res) {
    console.log(res)
    if(res.status === 'connected') {
        
      var access_token = res.authResponse.accessToken;
      var facebook_id = res.authResponse.userID;
      
      FB.api('/me?fields=email,first_name,last_name,picture,friends', function(res) {
        console.info("FB callback", res);

        var data = res;

        data.access_token = access_token;
        data.facebook_id = facebook_id;
        data.profile_picture = res.picture.data.url;

        // do this with you ajaxRequest function
        // callback function is gonna be authenticationSuccessfull, which will set the token
        return ajaxRequest("POST", 'https://plannerr-api.herokuapp.com/api/auth/facebook', data, authenticationSuccessful);
        // $.post('http://localhost:3000/api/auth/facebook', data)
        //   .then(function(res) {
        //     // TODO: put token in AJAX request header
        //     console.log(res);
        //   });

      });
      $('.fb-logout').removeClass('hidden');
      $('.fb-login').addClass('hidden');
      renderUserProfileView()
    }
    else {

      // TODO: remove token from AJAX request header
      removeToken();
      $('.fb-logout').addClass('hidden');
      $('.fb-login').removeClass('hidden');
      $("#container").html("");

    }

  }

  // start frontend login for facebook
  FB.getLoginStatus(function(res) {
    checkLoginStatus(res);
  });

  $fbLogin.on('click', function() {
    event.preventDefault();
    FB.login(function(res) {
      checkLoginStatus(res);
    }, { scope: 'public_profile,email,user_friends' });
  })

  $fbLogout.on('click', function() {
    event.preventDefault();
    FB.logout(function(res) {
      checkLoginStatus(res);
    });
  });

  // init side nav
  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    }
  );
  // end frontend login for facebook

  //////////////////////////
  // Google Maps Function //
  //////////////////////////


  // This example adds a search box to a map, using the Google Place Autocomplete
  // feature. People can enter geographical searches. The search box will return a
  // pick list containing a mix of places and predicted search terms.

  function initAutocomplete() {

    // Create the search box and link it to the UI element.
    var $input = $('#pac-input');
    var searchBox = new google.maps.places.SearchBox($input[0]);
    var $placeId = $('input[name=place_id]');

    var markers = [];

    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();
      $input.val(places[0].name + ", " + places[0].formatted_address);

      $placeId.val(places[0].id);
    });
  }
});






