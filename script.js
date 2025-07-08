// Pure Monaco Editor Implementation
let editor;
let currentFontSize = 16;
let lineNumbersEnabled = true;
let wordWrapEnabled = true;

// Custom Pure Dark Theme
const pureDarkTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: 'comment', foreground: '6B7A99', fontStyle: 'italic' },
    { token: 'string', foreground: '4CAF50' },
    { token: 'number', foreground: 'FF9800' },
    { token: 'keyword', foreground: '7B8CFF', fontStyle: 'bold' },
    { token: 'function', foreground: 'E91E63' },
    { token: 'variable', foreground: 'F3F6FA' },
    { token: 'operator', foreground: 'FF6B81' },
    { token: 'type', foreground: '7B8CFF' },
    { token: 'class', foreground: '7B8CFF' },
    { token: 'constant', foreground: 'FF9800' }
  ],
  colors: {
    'editor.background': '#181A20',
    'editor.foreground': '#F3F6FA',
    'editor.lineHighlightBackground': 'rgba(123, 140, 255, 0.1)',
    'editor.selectionBackground': 'rgba(123, 140, 255, 0.3)',
    'editor.inactiveSelectionBackground': 'rgba(123, 140, 255, 0.2)',
    'editorCursor.foreground': '#7B8CFF',
    'editorWhitespace.foreground': '#3A3F5A',
    'editorIndentGuide.background': '#3A3F5A',
    'editorIndentGuide.activeBackground': '#7B8CFF',
    'editorLineNumber.foreground': '#6B7A99',
    'editorLineNumber.activeForeground': '#7B8CFF',
    'editorGutter.background': '#181A20',
    'editorError.foreground': '#FF6B81',
    'editorWarning.foreground': '#FFE066',
    'editorInfo.foreground': '#7B8CFF',
    'editorBracketMatch.background': 'rgba(123, 140, 255, 0.2)',
    'editorBracketMatch.border': '#7B8CFF',
    'editor.findMatchBackground': 'rgba(255, 152, 0, 0.3)',
    'editor.findMatchHighlightBackground': 'rgba(255, 152, 0, 0.2)',
    'editor.findRangeHighlightBackground': 'rgba(123, 140, 255, 0.1)',
    'editor.hoverHighlightBackground': 'rgba(123, 140, 255, 0.1)',
    'editorLink.activeForeground': '#7B8CFF',
    'diffEditor.insertedTextBackground': 'rgba(76, 175, 80, 0.2)',
    'diffEditor.removedTextBackground': 'rgba(255, 107, 129, 0.2)',
    'scrollbarSlider.background': '#3A3F5A',
    'scrollbarSlider.hoverBackground': '#4A4F6A',
    'scrollbarSlider.activeBackground': '#5A5F8A'
  }
};

// Initialize Monaco Editor
require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs' } });

require(['vs/editor/editor.main'], function() {
  // Register custom theme
  monaco.editor.defineTheme('pure-dark', pureDarkTheme);
  
  // Create editor
  editor = monaco.editor.create(document.getElementById('monaco-editor'), {
    value: `-- Pure Monaco Editor Test
-- This is a Lua script with syntax highlighting

local Players = game:GetService("Players")
local LocalPlayer = Players.LocalPlayer
local Character = LocalPlayer.Character or LocalPlayer.CharacterAdded:Wait()

-- Function example
function testFunction()
    local test = "Hello from Pure Monaco Editor!"
    print(test)
    return test
end

-- Loop example
for i = 1, 10 do
    if i % 2 == 0 then
        print("Even number: " .. i)
    else
        print("Odd number: " .. i)
    end
end

-- Call the function
testFunction()`,
    language: 'lua',
    theme: 'pure-dark',
    fontSize: currentFontSize,
    fontFamily: 'Poppins, monospace',
    lineNumbers: lineNumbersEnabled ? 'on' : 'off',
    wordWrap: wordWrapEnabled ? 'on' : 'off',
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    automaticLayout: true,
    roundedSelection: false,
    scrollbar: {
      vertical: 'visible',
      horizontal: 'visible',
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    },
    overviewRulerBorder: false,
    hideCursorInOverviewRuler: true,
    renderLineHighlight: 'all',
    selectOnLineNumbers: true,
    glyphMargin: false,
    folding: true,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
    renderWhitespace: 'none',
    useTabStops: false,
    tabSize: 4,
    insertSpaces: true,
    detectIndentation: false,
    trimAutoWhitespace: true,
    largeFileOptimizations: true,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnCommitCharacter: true,
    acceptSuggestionOnEnter: 'on',
    wordBasedSuggestions: true,
    parameterHints: {
      enabled: true,
      cycle: false
    },
    autoIndent: 'full',
    formatOnType: true,
    formatOnPaste: true,
    suggest: {
      insertMode: 'replace',
      showKeywords: true,
      showSnippets: true,
      showClasses: true,
      showFunctions: true,
      showVariables: true,
      showModules: true,
      showProperties: true,
      showEvents: true,
      showOperators: true,
      showUnits: true,
      showValues: true,
      showConstants: true,
      showEnums: true,
      showEnumMembers: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showWords: true
    }
  });

  // Set up event listeners
  setupEventListeners();
  
  // Focus the editor
  editor.focus();
  
  console.log('Pure Monaco Editor loaded successfully!');
});

// Event Listeners
function setupEventListeners() {
  // Font size button
  document.getElementById('font-size-btn').addEventListener('click', () => {
    const sizes = [12, 14, 16, 18, 20, 22, 24];
    const currentIndex = sizes.indexOf(currentFontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    currentFontSize = sizes[nextIndex];
    
    editor.updateOptions({ fontSize: currentFontSize });
    document.getElementById('font-size-btn').textContent = `Font Size: ${currentFontSize}px`;
  });

  // Line numbers button
  document.getElementById('line-numbers-btn').addEventListener('click', () => {
    lineNumbersEnabled = !lineNumbersEnabled;
    editor.updateOptions({ 
      lineNumbers: lineNumbersEnabled ? 'on' : 'off' 
    });
    
    const btn = document.getElementById('line-numbers-btn');
    if (lineNumbersEnabled) {
      btn.classList.add('active');
      btn.textContent = 'Line Numbers';
    } else {
      btn.classList.remove('active');
      btn.textContent = 'No Line Numbers';
    }
  });

  // Word wrap button
  document.getElementById('word-wrap-btn').addEventListener('click', () => {
    wordWrapEnabled = !wordWrapEnabled;
    editor.updateOptions({ 
      wordWrap: wordWrapEnabled ? 'on' : 'off' 
    });
    
    const btn = document.getElementById('word-wrap-btn');
    if (wordWrapEnabled) {
      btn.classList.add('active');
      btn.textContent = 'Word Wrap';
    } else {
      btn.classList.remove('active');
      btn.textContent = 'No Word Wrap';
    }
  });

  // Theme button
  document.getElementById('theme-btn').addEventListener('click', () => {
    const currentTheme = editor.getOption(monaco.editor.EditorOption.theme);
    const newTheme = currentTheme === 'pure-dark' ? 'vs-dark' : 'pure-dark';
    
    editor.updateOptions({ theme: newTheme });
    document.getElementById('theme-btn').textContent = 
      newTheme === 'pure-dark' ? 'Pure Dark' : 'VS Dark';
  });

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl+S for save
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      saveContent();
    }
    
    // Ctrl+Shift+S for save as
    if (e.ctrlKey && e.shiftKey && e.key === 'S') {
      e.preventDefault();
      saveAsContent();
    }
    
    // Ctrl+O for open
    if (e.ctrlKey && e.key === 'o') {
      e.preventDefault();
      openFile();
    }
  });

  // Window resize
  window.addEventListener('resize', () => {
    if (editor) {
      editor.layout();
    }
  });
}

// File operations
function saveContent() {
  const content = editor.getValue();
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'script.lua';
  a.click();
  URL.revokeObjectURL(url);
  console.log('Content saved!');
}

function saveAsContent() {
  const content = editor.getValue();
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = prompt('Enter filename:', 'script.lua') || 'script.lua';
  a.click();
  URL.revokeObjectURL(url);
  console.log('Content saved as!');
}

function openFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.lua,.txt,.js,.py,.html,.css,.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        editor.setValue(e.target.result);
        console.log('File loaded:', file.name);
      };
      reader.readAsText(file);
    }
  };
  input.click();
}

// Export functions for external use
window.PureMonacoEditor = {
  getEditor: () => editor,
  getValue: () => editor ? editor.getValue() : '',
  setValue: (value) => editor ? editor.setValue(value) : null,
  updateOptions: (options) => editor ? editor.updateOptions(options) : null,
  focus: () => editor ? editor.focus() : null,
  save: saveContent,
  saveAs: saveAsContent,
  open: openFile
}; 