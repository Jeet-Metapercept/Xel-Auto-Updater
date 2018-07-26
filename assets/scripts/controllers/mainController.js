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
			no_update.innerHTML = "Latest Version";
			no_update.opened = true;
    })	
	ipcRenderer.on('updateReady', function(event, text) { 
			$timeout(function() {
				angular.element('#update_available').triggerHandler('click');
			});
			
			/* var new_update = document.getElementById("update_available");
			new_update.addEventListener("click",function(e){
				button.disabled = "true";
			},false); */
    })
	
	var notification = document.querySelector("#notify");
	$scope.installUpdates = function(){
		ipcRenderer.send('quitAndInstall');
	}
	
		
});
