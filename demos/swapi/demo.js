$(document).ready(function() {
  let count = 1;

  function getData(num) {
    $.get(`http://swapi.co/api/people/${num}/`, function(data) {

      $('#dataview').html('<p> Name: ' + data.name + '</p>');
       $('#dataview').append('<p>Eye Color : ' + data.eye_color + '</p>');
       $('#dataview').append('<p> Gender: ' + data.gender + '</p>');
      /*$.each(data, function(key, value) {
        $('#dataview').append(`<p><strong>${key}</strong>: ${value}</p>`);
      });*/
      $('#counter').text(`Person: ${count}`);
      console.log(data)
    });
  }

    $('#next').on('click', function() {
      getData(++count);
    });

    $('#prev').on('click', function() {
      if(count > 1) getData(--count);
    });

   getData(count);

})
