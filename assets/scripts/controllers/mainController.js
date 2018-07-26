appName.controller('mainController', function ($scope, electron, ipc) {

const ipcRenderer = require('electron').ipcRenderer;

	$scope.appVersion = require('electron').remote.app.getVersion();
	console.log($scope.appVersion);

	ipcRenderer.on('updateAvailable', function(event, text) {
			var update = document.querySelector("#notify");
			update.innerHTML = "New Updates Available";
			update.opened = true;
    })
	ipcRenderer.on('updateNotAvailable', function(event, text) {
			var no_update = document.querySelector("#notify");
			no_update.innerHTML = "Latest Version : v" + $scope.appVersion;
			no_update.opened = true;
    })	
	//update downloaded
	ipcRenderer.on('updateReady', function(event, text) {
			var update = document.querySelector("#notify");
			update.innerHTML = "update download complete";
            update.opened = true;
			
				$('#update_available').click();
    })
	$('#update_available').click();
	var notification = document.querySelector("#notify");
	$scope.installUpdates = function(){
		ipcRenderer.send('quitAndInstall');
	}
	
		
});
