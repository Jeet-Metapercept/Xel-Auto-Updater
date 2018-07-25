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

	$scope.showMessage = function() {
		electron.dialog.showMessageBox({
		  type: 'info',
		  title: 'Software Update',
		  message: 'New update available. Click ok to download the updates',
		  //buttons: ['OK', 'Nope'],
		  buttons: ['Cancel', 'OK'],
		  cancelId: 0,
		  defaultId: 1
		}).then((result) => { //Promise, not callback.
		  console.log(result);
		  if(result == 1){
			  console.log('yes');
		  }
		}, () => {
		  console.log('error');
		});
   };
	
//UPDATE CHECKER
const ipcRenderer = require('electron').ipcRenderer;
	
	/* ipcRenderer.on('message', function(event, text) {
	 console.log(text);
	 $scope.updateDetails = text;
	 
	 $scope.download_complete = text
	})  */
	
	ipcRenderer.on('update', function(event, text) {
	 //console.log(text);
	 //$scope.download_complete = text;
	 var update_details = document.getElementById('percent');
	  update_details.innerHTML = text.toFixed(2) + '%';
	  document.getElementsByTagName("x-progressbar")[0].setAttribute("value", text/100)
	})
	//speed
	ipcRenderer.on('speed', function(event, speed) {
	 var update_speed = document.getElementById('speed');
	  update_speed.innerHTML = speed/1024 + 'kbps';
	})
	//total update
	ipcRenderer.on('total', function(event, total) {
	 var update_total = document.getElementById('total');
	  update_total.innerHTML = total/1024 + 'MB';
	})

	ipcRenderer.on('transferred', function(event, transferred) {
	 var update_transferred = document.getElementById('transferred');
	  update_transferred.innerHTML = transferred/1024 + 'MB';
	})
});
