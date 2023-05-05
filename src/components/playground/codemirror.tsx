import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import theme from '../../theme';

import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

const dark = vscodeDarkInit({
  settings: { background: theme.colors.bgDarkBlue, gutterBackground: '#0f202d' },
});

const CodeEditor = (props: typeof CodeMirror) => {
  return <CodeMirror extensions={[graphql()]} theme={dark} {...props} />;
};

export { CodeEditor };
