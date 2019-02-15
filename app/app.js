$(document).ready(function() {
//global variables
  var enter_key = 13;

  var data = (localStorage.getItem('mytasks')) ? JSON.parse(localStorage.getItem('mytasks')):{
    tasks: [],
    completed: []
  };

  //buttons
  var delSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
  var completedSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';


  $("#task-input").keypress(function(e) {
    if (e.which == enter_key) {
      var value = document.getElementById('task-input').value;
      if (value) {
        data.tasks.push(value);
        addTask(value);
        save_data();
        $("#task-input").val("");
      }
    }
  });

  //add task function
  var addTask = function(text, completed) {
    var list = (completed) ? document.getElementById('completed') : document.getElementById('task');

    var item = document.createElement('li');
    item.innerText = text;

    var buttons = document.createElement('div');
    buttons.classList.add('buttons');

    var del = document.createElement('button');
    del.classList.add('del');
    del.innerHTML = delSVG;

    // if delete button is clicked
    del.addEventListener('click', delTask);

    var completed = document.createElement('button');
    completed.classList.add('completed');
    completed.innerHTML = completedSVG;

    // if complete button is clicked
    completed.addEventListener('click', completedTask);

    buttons.appendChild(del);
    buttons.appendChild(completed);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
  };

  //delete task function
  var delTask = function() {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var value = item.innerText;

    if (id === "task") {
      data.tasks.splice(data.tasks.indexOf(value), 1);
    } else {
      data.completed.splice(data.completed.indexOf(value),1);
    }
    save_data();

    parent.removeChild(item);
  };

  var completedTask = function () {
    var item = this.parentNode.parentNode;
    var parent = item.parentNode;
    var id = parent.id;
    var target = (id === 'task') ? document.getElementById('completed') : document.getElementById('task');
    var value = item.innerText;

    if (id === "task") {
      data.tasks.splice(data.tasks.indexOf(value), 1);
      data.completed.push(value);
    } else {
      data.completed.splice(data.completed.indexOf(value),1);
      data.tasks.push(value);
    }
    save_data();

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
  };

  var save_data = function () {
    localStorage.setItem("mytasks", JSON.stringify(data));
  };

  var load_data = function () {
    if (!data.tasks.length && !data.completed.length) return;
      for (var i = 0; i < data.tasks.length; i++) {
        var value = data.tasks[i];
        addTask(value);
      }
      for (var j = 0; j < data.completed.length; j++) {
        var value = data.completed[j];
        addTask(value, true);
      }
  };
  var grabTask = function () {
    var value = this.innerText;
  };

  var editTask = function () {
    var edit = this.innerText;
    var tasksIndex = data.tasks.indexOf(value);
    var completedIndex = data.tasks.indexOf(value);
    if (data.tasks.includes(value)) {
      data.tasks[tasksIndex] = edit;
    } else {
      data.completed[completedIndex] = edit;
    }
  };

  load_data();

  //edit not working T_T
  $(".task").click(function() {
    $(".task").attr('contentEditable',true);
      grabTask();
      $(".task").keypress(function(e) {
        if(e.which == enter_key) {
          $(".task").attr('contentEditable',false);
          var edit = this.innerText;
         editTask();
        }
      });
  });
});


















