/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const opn = require('opn');
const cp = require('child_process');
const path = require('path');

const proc = cp.execFile(path.join(__dirname, process.platform === 'win32' ? 'server.bat' : 'server.sh'),  process.argv);

let launched = false;
proc.stdout.on("data", data => {
	if (!launched && data.toString().indexOf('Extension host agent listening on 8000')) {
		launched = true;

		setTimeout(() => {
			const url = 'http://127.0.0.1:8000';
			console.log(`Opening ${url} in your browser...`);

			opn(url).catch(() => { console.log(`Failed to open in your browser. Please do so manually.`) });
		}, 100);
	}
});