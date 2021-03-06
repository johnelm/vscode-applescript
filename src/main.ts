'use strict';

// Dependencies
import { commands } from 'vscode';

// Modules
import { osacompile, osascript } from './osa';

const activate = (context) => {
  context.subscriptions.push(
    commands.registerTextEditorCommand('extension.applescript.run', () => {
      return osascript();
    })
  );
  context.subscriptions.push(
    commands.registerTextEditorCommand('extension.applescript.compile', () => {
      return osacompile('scpt');
    })
  );
  context.subscriptions.push(
    commands.registerTextEditorCommand('extension.applescript.compileBundle', () => {
      return osacompile('scptd');
    })
  );
  context.subscriptions.push(
    commands.registerTextEditorCommand('extension.applescript.compileApp', () => {
      return osacompile('app');
    })
  );
};

export { activate };
