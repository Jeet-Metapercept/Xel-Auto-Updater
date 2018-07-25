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
	
//UPDATE CHECKER
const ipcRenderer = require('electron').ipcRenderer;
	
	ipcRenderer.on('message', function(event, text) {
	 console.log(text);
	 $scope.updateDetails = text;
	}) 
	
});
