var userList = document.querySelector(".user-list")
var msgTemplate = document.querySelector(".msg-template")
var msgWrap = document.getElementById("msg-wrap")



var form = document.getElementById("msg-form")
msgWrap.removeChild(msgTemplate);


var socket = io();

var newUsername = prompt("Who the hell are you?")

socket.on("connect", function () {
	console.log("I connected!")
	socket.emit("client register user", newUsername)
});



socket.on ("list names", function (nameArray) {
	console.log(nameArray);
	userList.innerHTML = ""
	for (i = 0; i < nameArray.length; i ++){
		var newName = document.createElement("li")
		newName.textContent = nameArray[i];
		userList.appendChild(newName);
	}
})

socket.on ("create history", function (userChatLog) {
	for (i = 0; i < userChatLog.length; i ++) {
		var firstUn = userChatLog[i].username
		var firstMsg = userChatLog[i].message
		updateChat(firstUn, firstMsg)
	}

})

socket.on("update messages", function (newUsername, msgValue){
		updateChat (newUsername, msgValue)
})


form.onsubmit = function (event) {
	event.preventDefault();
	var msgValue = form.elements["new-msg"].value
	updateChat(newUsername, msgValue);
	socket.emit("user sent a message", newUsername, msgValue)
}

function updateChat (newUsername, msgValue) {
		var clone = msgTemplate.cloneNode(true);
		var msg = clone.querySelector(".msg");
		var user = clone.querySelector(".username")
		var time = clone.querySelector(".time")
		user.textContent = newUsername
		time.textContent = ""
		msg.textContent = msgValue;
		msgWrap.appendChild(clone);
}









