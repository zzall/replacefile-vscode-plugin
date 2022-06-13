const vscode = require('vscode');
const { toString, fromString } = require('uint8arrays');

function activate(context) {
	console.log('Congratulations, your extension "replacefile-vscode-plugin" is now active!');
	let disposable = vscode.commands.registerTextEditorCommand('extension.replacefile', function (textEditor, edit, args) {
		const currentUri = args || textEditor && textEditor.document && textEditor.document.uri
		if (currentUri) {
			vscode.workspace.fs.readFile(currentUri).then(res => {
				const contentUTF8 = toString(res);
				const replacedContentUTF8 = contentUTF8.replace(/(?<=[ \:\-\+\*\/\'\"\)\(\!)])(\d+)px(?=[ ;\-\+\*\/\'\"\)\(\!])/g, function (a, b) { return `${b / 2}px` });
				vscode.workspace.fs.writeFile(currentUri, fromString(replacedContentUTF8)).then(() => {
					vscode.window.showInformationMessage('文件替换成功');
				})
				vscode.window.showInformationMessage('文件替换成功');
			}, err => {
				vscode.window.showErrorMessage('fs.readFile失败：', err);
			})
		} else {
			vscode.window.showErrorMessage('找不到文件uri');
		}
	});

	context.subscriptions.push(disposable);
}

function deactivate() { }

module.exports = {
	activate,
	deactivate
}
