'use strict';

// Dependencies
import { platform } from 'os';
import { workspace, window } from 'vscode';
import { browserify } from 'browserify';
import { through } from 'through';
import { Writable } from 'stream';
import { createReadStream } from 'fs';

// Modules
import { getConfig, getOutName, spawnPromise } from './util';

const outputChannel = window.createOutputChannel('AppleScript');

// const b = browserify();

// // var through = require('through');

// b.transform(file => {
//     let readStream = createReadStream( file );
//     let writable = new Writable();
//     try {
//       writable.write( 'window = this;');
//       readStream.pipe( writable, { end: false } );
//       writable.end( ';ObjC.import("stdlib");$.exit(0)' );
//     } catch (e) {
//       writable.end()
//     }
// });

// var data = '';
// var dirname = path.dirname(file);
// const transform = file => {
// return through( // should be able to use a builtin nodejs stream
//   function write(buf) { data += buf; },
//   function end() {
//     var output = falafel(data, function (node) {
//       if(isRequireFor(node, 'concatenify')){
//         node.update('undefined');
//       }
//       if(isCallFor(node, 'concatenify')){
//         var filePath = getArgOfType(node, 0, 'Literal');
//         var treeFile = makeTreeFile(dirname, filePath);
//         node.update(treeFile);
//       }
//     });
//     this.queue(String(output));
//     this.queue(null);
//   }
// );
// }


const osacompile = (compileTarget: string) => {
  const config = getConfig();

  if (platform() !== 'darwin' && config.ignoreOS !== true) {
    return window.showWarningMessage('This command is only available on macOS');
  }

  let doc = window.activeTextEditor.document;

  doc.save().then( () => {
    const outName = getOutName(doc.fileName, compileTarget);

    spawnPromise('osacompile', ['-o', outName, doc.fileName], outputChannel)
    .then( () => {
      if (config.showNotifications) window.showInformationMessage(`Successfully compiled '${doc.fileName}'`);
     })
    .catch( () => {
      outputChannel.show(true);
      if (config.showNotifications) window.showErrorMessage('Failed to run compile (see output for details)');
    });
  });
};

const osascript = () => {
  if (platform() !== 'darwin' && getConfig().ignoreOS !== true) {
    return window.showWarningMessage('This command is only available on macOS');
  }

  let doc = window.activeTextEditor.document;

  doc.save().then( () => {
    let scriptCommand = 'osascript';
    if ( doc.fileName.endsWith( '.js' )) {
      scriptCommand = '/Users/jelm1//code/johnelm-private-osascripts/node_modules/.bin/jxa-browserify-run';
    }
    return spawnPromise(scriptCommand, [doc.fileName], outputChannel)
    .catch( () => {
      outputChannel.show(true);
      if (getConfig().showNotifications) window.showErrorMessage('Failed to run script (see output for details)');
    });
  });
};

const osaBrowserifyCompile = () => {
  
};
// add my new jxa-browserify module to this package

// const osaBrowserifyRun = () => {
//   if (platform() !== 'darwin' && getConfig().ignoreOS !== true) {
//     return window.showWarningMessage('This command is only available on macOS');
//   }

//   let doc = window.activeTextEditor.document;
//   let inputpipe;

//   doc.save().then( () => {
//     // window.showWarningMessage('hello from john!');
//     // spawnPromise('browserify');
//     Promise.all( [
//       spawnPromise('browserify', [doc.fileName], outputChannel)
//       .then( => browserifyOutput {
//       }),
//       spawnPromise('osascript', [doc.fileName], outputChannel, inputpipe )
//   ] )
//     .catch( () => {
//       outputChannel.show(true);
//       if (getConfig().showNotifications) window.showErrorMessage('Failed to run script (see output for details)');
//     });
//   });
// };

export { osacompile, osascript };
