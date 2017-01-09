const {ipcRenderer} = require('electron')
//tell main process that the toogle-insert-view event was fired from the client-side so a new window will open up.
angular
	.module('Utils', [])
	.directive('toggleInsertView', function() {
		return function(scope, el) {
			el.bind('click', function(e) {
				e.preventDefault();
				ipcRenderer.send('toggle-insert-view');
			});
		};
	});