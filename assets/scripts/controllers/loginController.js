appName.controller('loginController', function ($rootScope, $scope, electron, ipc) {

$rootScope.$on('electron-msg', (event, msg) => {
    console.log(msg);
});

	$scope.doSomething = function() {
		ipc.send('Muggles');
	  }
	$scope.showErrorBox = function() {
		electron.dialog.showErrorBox('Error Title', 'You totally screwed up.');
	  }
	  
	$scope.doBeep = function() {
		electron.shell.beep();
	}

	
const ipcRenderer = require('electron').ipcRenderer;	
	$scope.showUpdateMessage = function() {
		electron.dialog.showMessageBox({
		  type: 'info',
		  title: 'Software Update',
		  message: 'New updates are available. Click ok to install the updates',
		  //buttons: ['OK', 'Nope'],
		  buttons: ['Cancel', 'Ok'],
		  cancelId: 0,
		  defaultId: 1
		}).then((result) => { //Promise, not callback.
		  console.log(result);
		  if(result == 1){
			  console.log('yes');
			  $scope.doBeep();
			  ipcRenderer.send('quitAndInstall');
		  }
		}, () => {
		  console.log('error');
		});
   };
	
//UPDATE CHECKER
	ipcRenderer.on('update', function(event, text) {
	 //console.log(text);
	 //$scope.download_complete = text;
	 var update_details = document.getElementById('percent');
	  update_details.innerHTML = text.toFixed(2) + ' %';
	  document.getElementsByTagName("x-progressbar")[0].setAttribute("value", text/100)
	})
	//speed
	ipcRenderer.on('speed', function(event, speed) {
	 var update_speed = document.getElementById('speed');
	  update_speed.innerHTML = (speed/1024).toFixed(2) + ' kbps';
	})
	//total update
	ipcRenderer.on('total', function(event, total) {
	 var update_total = document.getElementById('total');
	  update_total.innerHTML = (total/1024).toFixed(2) + ' kb';
	})
	//transferred
	ipcRenderer.on('transferred', function(event, transferred) {
	 var update_transferred = document.getElementById('transferred');
	  update_transferred.innerHTML = (transferred/1024).toFixed(2) +  ' kb';
	})
	//update downloaded
	ipcRenderer.on('updateReady', function(event, text) {
			var update = document.querySelector("#notify");
			update.innerHTML = "update download complete";
            update.opened = true;
			
			$scope.showUpdateMessage();
    })
	
	
});
