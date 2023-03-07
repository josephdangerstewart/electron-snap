const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronSnap', {
	saveLocalFile: (fileName, extension, contents) => {
		ipcRenderer.send('saveLocalFile', fileName, extension, contents)
	}
});
