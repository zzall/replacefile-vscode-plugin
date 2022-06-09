const vscode = require('vscode');
const { toString, fromString } = require('uint8arrays');

function activate(context) {
	console.log('Congratulations, your extension "replacefile-vscode-plugin" is now active!');
	let disposable = vscode.commands.registerCommand('replacefile', function (uri) {
		vscode.workspace.fs.readFile(uri).then(res => {
			const contentUTF8 = toString(res);
			const replacedContentUTF8 = contentUTF8.replace(/(?<=[ \:\-\+\*\/\'\"\)\(\!)])(\d+)px(?=[ ;\-\+\*\/\'\"\)\(\!])/g, function (a, b) { return `${b / 2}px` });
			vscode.workspace.fs.writeFile(uri, fromString(replacedContentUTF8)).then(() => {
				vscode.window.showInformationMessage('文件替换成功');
			})
		})
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
