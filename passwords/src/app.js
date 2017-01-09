const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

const {ipcMain} = require('electron')

var mainWindow = null,
		insertWindow = null;

//We will need to set the show property to false in the options object of the BrowserWindow constructor, in order to prevent the window from being open by default when the applications starts.
function createInsertWindow() {
	insertWindow = new BrowserWindow({
		width: 640,
		height: 480,
		show: false
	});

	insertWindow.loadURL(path.join(__dirname, '/windows/insert/insert.html'));
//We will need to destroy the BrowserWindow instance whenever the window is firing a closed event.
	insertWindow.on('closed', function() {
		insertWindow = null;
	});
}


//when the app is started, it fires a 'ready' event which we can bind to. At this point we instantiate the main window of the app.
app.on('ready', function() {
	//create new window my making new instance of BrowserWindow object and passing in an object with default settings for the window
	mainWindow = new BrowserWindow({
		width: 1024,
		height: 768
	});
	//the window instance has a loadUrl() method in it allowing us to load contents of an actual HTML file in the current window. The HTML file can be either local or remote.
	mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/windows/main/main.html'),
    protocol: 'file:',
    slashes: true
  }))
	//optional method which opens Chrome Dev tools for debugging purposes.
	mainWindow.webContents.openDevTools()

	ipcMain.on('toggle-insert-view', function(event, arg) {

		console.log(arg)
			if(!insertWindow) {
        even.sender.send(createInsertWindow())
    	}
	   even.sender.send(
	   	(!insertWindow.isClosed() && insertWindow.isVisible()) ? insertWindow.hide() : insertWindow.show()
	   	)
	    
	  });
});


