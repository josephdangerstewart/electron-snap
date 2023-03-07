const {
	app,
	BrowserWindow,
	dialog,
	ipcMain,
	nativeImage,
} = require('electron');
const path = require('path');
const fs = require('fs');

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

	win.loadFile('./index.html');
};

ipcMain.on('saveLocalFile', (event, fileName, mimeType, contents) => {
	const rawExtension = mimeType.split('/')[1].split(';')[0];
	const extension = rawExtension === 'plain' ? 'txt' : rawExtension;

	if (extension === 'png') {
		const img = nativeImage.createFromDataURL(contents);
		contents = img.toPNG();
	}

	dialog.showSaveDialog(
		BrowserWindow.getFocusedWindow(),
		{
			defaultPath: `${fileName}.${extension}`,
			filters: [
				{
					name: 'text',
					extensions: [extension],
				},
			],
		},
		(filename) => {
			fs.writeFileSync(filename, contents);
		}
	);
});

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
