process.title = "node-chat";

var WebSocketsServerPort = 1337;
var WebSocketServer = require("websocket").server;
var http = require("http");
var history = [];
var clients = [];

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

var colors = ["red", "green", "blue", "magenta", "purple", "plum", "orange"];
colors.sort(function(a, b) {
  return Math.random() > 0.5;
});

var server = http.createServer(function(req, res) {
  console.log(
    new Date() + "Server is listening at port" + WebSocketsServerPort
  );
});

server.listen(1337, function() {});

var wsServer = new WebSocketServer({
  httpServer: server
});

wsServer.on("request", function(request) {
  console.log(new Date() + " Connection from origin " + request.origin);

  var connection = request.accept(null, request.origin);
  var index = clients.push(connection) - 1;
  var userName = false;
  var useColor = false;
  console.log(new Date() + " Connection accepted.");

  if (history.length > 0) {
    connection.sendUTF(JSON.stringify({ type: "history", data: history }));
  }

  connection.on("message", function(message) {
    console.log(message);

    if (message.type === "utf8") {
      //process Websocket message
      if (userName === false) {
        userName = htmlEntities(message.utf8Data);
        useColor = colors.shift();
        connection.sendUTF(JSON.stringify({ type: "color", data: useColor }));

        console.log(new Date() + "User is know as: " + userName);
      } else {
        console.log(
          new Date() +
            " Received message from user: " +
            userName +
            ": " +
            message.utf8Data
        );

        var obj = {
          time: new Date().getTime(),
          text: htmlEntities(message.utf8Data),
          author: userName,
          color: useColor
        };
        history.push(obj);
        history = history.slice(-100);

        var json = JSON.stringify({ type: "message", data: obj });
        for (var i = 0; i < clients.length; i++) {
          clients[i].sendUTF(json);
        }
      }
    }
  });

  connection.on("close", function(connection) {
    //Close connnection
    if (userName !== false && useColor !== false) {
      console.log(
        new Date() + " Peer " + connection.remoteAddress + " disconnected"
      );
      clients.splice(index, 1);
      colors.push(useColor);
    }
  });
});
