// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


// Listen for messages
const {ipcRenderer} = require('electron');
ipcRenderer.on('message', function(event, text) {
	var container = document.getElementById('messages');
	var message = document.createElement('div');
	message.innerHTML = text;
	container.appendChild(message);
})