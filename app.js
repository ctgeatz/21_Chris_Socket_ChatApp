var express = require("express");
var app = express()

var path = require("path");
var publicPath = path.join(__dirname, "public");
var staticServer = express.static(publicPath);
app.use(staticServer);

var portPath = process.env.PORT || 8080;
var server = app.listen(portPath);
var io = require("socket.io")(server);


var userChatLog = []
var nameArray = []

io.on("connection", function (socket) {
	var name = ""
	console.log("A user connected.")
	socket.emit("create history", userChatLog);
	socket.on("client register user", function (newUsername) {
		name = newUsername
		nameArray.push(newUsername);
		io.emit("list names", nameArray)
	})
	socket.on("disconnect", function () {
		var removedNameIndex = nameArray.indexOf(name)
		nameArray.splice(removedNameIndex,1)
		io.emit("list names", nameArray);
	})

	socket.on("user sent a message",function (newUsername, msgValue){
		socket.broadcast.emit("update messages", newUsername, msgValue)
		userChatLog.push({username: newUsername, message: msgValue})
	})
		
})



