$(document).ready(function () {

  var arr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  for (let i = 0; i < arr.length; i++) {

    fetch('http://wind-bow.glitch.me/twitch-api/streams/' + arr[i])
      .then(
      function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(data => {
          console.log(data);
          if (data.stream) {
            $('.container').append('<div class="players players-online"><img src=' + data.stream.channel.logo + '><p class="big"><a href=' + data.stream.channel.url + ' target="_blank">' + data.stream.channel.display_name + '</a></p><p class="little"><em>is currently playing ' + data.stream.game + '</em><p></div>');
          } else {
            fetch('http://wind-bow.glitch.me/twitch-api/users/' + arr[i])
              .then(function (response) {
                response.json().then(data => {
                  $('.container').append('<div class="players players-offline"><img src=' + data.logo + '><p class="big"><a href=' + data._links.self + ' target="_blank">' + data.display_name + '</a></p><p class="little"><em>is currently playing offline</em><p></div>');
                })
              })
          }
        })
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }
  $('.online').on('click', function () {
    $('.players-online').show();
    $('.players-offline').hide("slow");
  });
  $('.offline').on('click', function () {
    $('.players-offline').show();
    $('.players-online').hide("slow");
  });
  $('.all').on('click', function () {
    $('.players-online').show();
    $('.players-offline').show();
  });
  
  $('#search-text-input').on('keyup', function(e){
    if($('#search-text-input').val()){
    $('.players').hide();
    }
  var txt = $('#search-text-input').val();
  $('.big').each(function(){
    if($(this).text().toLowerCase().indexOf(txt.toLowerCase())!== -1){
      $(this).parents().show();
    }
  });
  if(!$('#search-text-input').val()){
    $('.players').show();
  } 
   
 });

});