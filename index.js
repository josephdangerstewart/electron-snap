const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

const createWindow = () => {
	const win = new BrowserWindow({
		show: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});
	win.maximize();
	win.show();

	win.webContents.on('will-prevent-unload', (event) => {
		const options = {
			type: 'question',
			buttons: ['Cancel', 'Quit'],
			message: 'Quit Snap?',
			detail: 'Make sure to save your changes.',
		};
		const response = dialog.showMessageBoxSync(null, options);
		if (response === 1) {
			event.preventDefault();
		}
	});

	win.webContents.session.on('will-download', (event, item, contents) => {
		console.log('download!');
		console.log(item.getURL(), item.getMimeType(), item.getFilename());
	});

	win.loadFile('Snap/snap.html');
};

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
