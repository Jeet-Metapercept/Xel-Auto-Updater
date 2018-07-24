appName.controller('mainController', function ($scope) {

	$scope.appVersion = require('electron').remote.app.getVersion();
	console.log($scope.appVersion);

});
