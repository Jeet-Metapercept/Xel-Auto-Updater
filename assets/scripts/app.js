var appName = angular.module('app', ['ui.router', 'app.routes', 'electangular', 'ngAnimate'])

.run(function($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'

    // Initialize bootcards
    /* bootcards.init( {
        offCanvasBackdrop : true,
        offCanvasHideOnMainClick : true,
        enableTabletPortraitMode : true,
        disableRubberBanding : true,
        disableBreakoutSelector : 'a.no-break-out'
    }); */
});
