GLOBAL_DEFINITIONS = {};

function originalMethod(functionName) {
	return GLOBAL_DEFINITIONS[functionName];
}

function defineProxy(functionName, functionBody) {
	GLOBAL_DEFINITIONS[functionName] =
		IDE_Morph.prototype[functionName].bind(IDE_Morph);
	IDE_Morph.prototype[functionName] = functionBody;
	return functionName;
}

defineProxy('saveFileAs', (contents, mimeType, fileName) => {
	window.electronSnap.saveLocalFile(fileName, mimeType, contents);
});

// Override paths because snap content lives in snap/*
// Our snap is served from /snap.html
defineProxy('resourceURL', (...args) => `Snap/${args.join('/')}`);
