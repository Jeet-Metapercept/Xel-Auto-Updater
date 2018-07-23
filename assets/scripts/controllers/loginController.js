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
/* const ipcRenderer = require('electron').ipcRenderer;
const {autoUpdater} = require("electron-updater");

	autoUpdater.on('download-progress', (progressObj) => {
	  let log_message = "Download speed: " + progressObj.bytesPerSecond;
	  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
	  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
	  sendStatusToWindow(log_message);
	})
	
	function sendStatusToWindow(text) {
	  win.webContents.send('message', text);
	}
	
	ipcRenderer.on('message', function(event, text) {
	 var process_container = document.getElementById('messages');
	 var update_details = document.getElementById('check');
	 update_details.innerHTML = text;
	 
	 $scope.updateDetails = text;
	}) */
	$scope.doBeep = function() {
		electron.shell.beep();
	}

	$scope.showMessage = function() {
		electron.dialog.showMessageBox({
		  type: 'info',
		  title: 'Are you sure?',
		  message: 'Some message',
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
	
});
