import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import theme from '../../theme';

import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

const editorTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgDarkBlue, gutterBackground: '#0f202d' },
});

const responseTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgBlue },
});

type CodeMirrorProps = React.ComponentProps<typeof CodeMirror>;

const CodeEditor = React.memo((props: CodeMirrorProps) => {
  return <CodeMirror extensions={[graphql()]} theme={editorTheme} {...props} />;
});

const ResponseWindow = React.memo((props: CodeMirrorProps) => {
  return (
    <CodeMirror
      extensions={[graphql()]}
      theme={responseTheme}
      basicSetup={{ lineNumbers: false, foldGutter: false, highlightActiveLine: false }}
      editable={false}
      {...props}
    />
  );
});

export { CodeEditor, ResponseWindow };
