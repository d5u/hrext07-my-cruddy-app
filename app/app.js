$(document).ready(function(){
var $maincontainer = $(".main-container");
var enter_key = 13;


$('.task-input').keypress(function(e) {
  if (e.which == enter_key) {
    var id = $(".task-input").val();
    var task = $(".task-input").val();
    localStorage.setItem(id, task);
    var displayTask = localStorage.getItem(task);
    $(".main-container").append('<div class="display-data-item" data-task="' + task + '">' + task + '</div>');
    $(".task-input").val("");
    }
  });
});







  // $('.btn-add').on('click', function(e){
  //   console.log(e);
  //   var keyData = $('.input-key').val();
  //   var valueData = $('.input-value').val();
  //   // write to db
  //   localStorage.setItem(keyData, valueData);
  //   // read from db
  //   var displayText = keyData + ' | ' + localStorage.getItem(keyData);
  //   // this only displays the last one? might want to switch to html
  //   // and append a div
  //   // <div class="display-data-item" data-keyValue="keyData">valueData</div>
  //   // if you use backticks ` you can use ${templateLiterals}
  //   // TODO make this vars make sense across the app
  //   $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
  //   $('.input-key').val('');
  //   $('.input-value').val('');
  // });


//   // update db
//     // need to expand when  more than 1 item is added

//   // delete item
//   $('.container-data').on('click', '.display-data-item', function(e){
//     console.log(e.currentTarget.dataset.keyvalue);
//     var keyData = e.currentTarget.dataset.keyvalue;
//     localStorage.removeItem(keyData);
//     $('.container-data').text('');
//   });
//   // delete all?
//   $('.btn-clear').click(function(){
//     localStorage.clear();
//     $('.container-data').text('');
//   });

// });