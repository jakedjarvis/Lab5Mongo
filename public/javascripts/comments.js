$(document).ready(function(){
  $("#postComment").click(function(){
    var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
    var sobj = JSON.stringify(myobj);
    $("#json").text(sobj);
    var url = "comment";
    $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
            $("#done").html(textStatus);
        }
    })
  });

    $("#getComments").click(function() {
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  })

});
