$(document).ready(function() {
  console.log('script loaded.')

  var makeCall = function(){
    // ADD YOUR AJAX CALL HERE FOR RANDOMUSER API
  }

  

  var getData = function(data){
    console.log(data)
    var first_name;
    var last_name; 
    var name;
    var email; 
    var dob;
    var street;
    var city;
    var state;
    var address;
    var phone;
    var pw;
    var img_url;

    manipulateDom(name,email,dob,address,phone,pw,img_url)
  }

  var manipulateDom = function(name,email,dob,address,phone,pw,img_url){
    $('#bigtext').text(name)
    $('#photo').css('background-image',('url('+img_url+')'))
    $('#name').attr('data-store',name)
    $('#email').attr('data-store',email)
    $('#birthdate').attr('data-store',dob)
    $('#address').attr('data-store',address)
    $('#phone').attr('data-store',phone)
    $('#password').attr('data-store',pw)


  }

  var addEventListeners = function(){
    

  }()

})
