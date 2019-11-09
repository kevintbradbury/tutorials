$(function() {
  var content = $("#content");
  var input = $("#input");
  var status = $("#status");

  var myColor = false;
  var myName = false;

  window.WebSocket = window.WebSocket || window.MozWebSocket;
  if (!window.WebSocket) {
    content.html($("<p>"), {
      text: "Sorry, but your browser doesn't support WebSocket"
    });
    input.hide();
    $("span").hide();
    return;
  }

  var connection = new WebSocket("ws://10.10.100.70:1337");

  connection.onopen = function() {
    input.removeAttr("disabled");
    status.text("Choose name");
  };
  connection.onerror = function(err) {
    content.html($("<p>"), {
      text: "Sorry, but there's some problem with your connection."
    });
  };
  connection.onmessage = function(msg) {
    try {
      var json = JSON.parse(msg.data);
    } catch (err) {
      console.log("Invalid JSON: " + msg.data);
      return;
    }

    if (json.type === "color") {
      myColor = json.data;
      status.text(myName, ": ").css("color", myColor);
      input.removeAttr("disabled").focus();
    } else if (json.type === "history") {
      for (var i = 0; i < json.data.length; i++) {
        addMessage(
          json.data[i].author,
          json.data[i].text,
          json.data[i].color,
          new Date(json.data[i].time)
        );
      }
    } else if (json.type === "message") {
      input.removeAttr("disabled");
      addMessage(
        json.data.author,
        json.data.text,
        json.data.color,
        new Date(json.data.time)
      );
    } else {
      console.log("Never seen JSON like this");
    }
  };

  input.keydown(function(e) {
    if (e.keyCode === 13) {
      var msg = $(this).val();
      console.log(msg);

      if (!msg) {
        return;
      } else {
        connection.send(msg);
        $(this).val("");
        //   input.attr("disabled", "disabled");

        if (myName === false) {
          myName = msg;
        }
      }
    }
  });

  function addMessage(author, message, color, dt) {
    content.prepend(
      "<p><span style='color: " +
        color +
        "'>" +
        author +
        "</span> @ " +
        (dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours()) +
        ":" +
        (dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes()) +
        ": " +
        message +
        "<p>"
    );
  }
});
