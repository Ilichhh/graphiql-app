import React from 'react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { graphql, updateSchema } from 'cm6-graphql';
import { EditorView } from '@codemirror/view';
import theme from '../../theme';
import { useGraphQLSchema } from '../../hooks/useGraphQLSchema';

import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';

const requestEditorTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgDarkBlue, gutterBackground: '#0f202d' },
});

const variablesEditorTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgBlack, gutterBackground: theme.colors.bgBlack },
});

const responseTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgBlue },
});

type CodeMirrorProps = React.ComponentProps<typeof CodeMirror>;

const RequestEditor = React.memo((props: CodeMirrorProps) => {
  const schema = useGraphQLSchema('https://swapi-graphql.netlify.app/.netlify/functions/index');
  const refs = React.useRef<ReactCodeMirrorRef>({});
  React.useEffect(() => {
    const view = refs.current.view;
    if (!view) return;

    updateSchema(view, schema);
  }, [refs, schema]);
  return <CodeMirror ref={refs} extensions={[graphql()]} theme={requestEditorTheme} {...props} />;
});

const MetadataEditor = React.memo((props: CodeMirrorProps) => {
  return <CodeMirror extensions={[graphql()]} theme={variablesEditorTheme} {...props} />;
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

export { RequestEditor, MetadataEditor, ResponseWindow };
