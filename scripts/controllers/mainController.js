appName.controller('mainController', function ($scope) {

	// Display the current version
	var version = require('electron').remote.app.getVersion();
	console.log("v" + version);
	document.getElementById('version').innerText = version;	

});
