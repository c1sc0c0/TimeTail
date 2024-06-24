const { Plugin } = require('obsidian');

class AddTimestampPlugin extends Plugin {
  onload() {
    console.log('Loading TimeTail Plugin');

    // Register an event listener for editor changes
    this.registerEvent(this.app.workspace.on('editor-change', (editor) => {
      const content = editor.getValue();
      const lines = content.split('\n');
      const now = new Date();
      const currentDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      // Loop through each line and update lines starting with '%%ts%%'
      const newContent = lines.map(line => {
        if (line.trim().startsWith('%%ts%%')) {
          return `%%ts%% Last Updated: ${currentDateTime}`;
        }
        return line;
      }).join('\n');

      // Only update the content if there was a change
      if (newContent !== content) {
        const cursor = editor.getCursor(); // Save current cursor position
        editor.setValue(newContent);
        editor.setCursor(cursor); // Restore cursor position
      }
    }));
  }

  onunload() {
    console.log('Unloading TimeTail Plugin');
  }
}

module.exports = AddTimestampPlugin;