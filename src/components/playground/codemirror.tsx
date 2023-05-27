import React, { useEffect, useRef } from 'react';
import CodeMirror, { ReactCodeMirrorRef } from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDarkInit } from '@uiw/codemirror-theme-vscode';
import { graphql, updateSchema } from 'cm6-graphql';
import { useTabsState, useGraphQLSchema } from '../../hooks';

import theme from '../../theme';

const requestEditorTheme = vscodeDarkInit({
  settings: { background: theme.colors.bgDarkBlue, gutterBackground: theme.colors.bgDarkBlue },
});

const metadataEditorTheme = vscodeDarkInit({
  settings: {
    background: theme.colors.bgBlack,
    gutterBackground: theme.colors.bgBlack,
    lineHighlight: theme.colors.bgDarkBlue,
  },
});

const responseTheme = vscodeDarkInit({
  settings: {
    background: theme.colors.bgBlue,
    gutterBackground: theme.colors.bgBlue,
  },
});

type CodeMirrorProps = React.ComponentProps<typeof CodeMirror>;

const RequestEditor = React.memo((props: CodeMirrorProps) => {
  const refs = useRef<ReactCodeMirrorRef>({});
  const { endpoint } = useTabsState();
  const { schema } = useGraphQLSchema(endpoint);

  useEffect(() => {
    const view = refs.current.view;
    if (!view || !schema) return;

    updateSchema(view, schema);
  }, [refs, schema]);

  return <CodeMirror ref={refs} extensions={[graphql()]} theme={requestEditorTheme} {...props} />;
});

const MetadataEditor = React.memo((props: CodeMirrorProps) => {
  return <CodeMirror theme={metadataEditorTheme} {...props} />;
});

const ResponseWindow = React.memo((props: CodeMirrorProps) => {
  return (
    <CodeMirror
      extensions={[json()]}
      theme={responseTheme}
      basicSetup={{
        lineNumbers: false,
        highlightActiveLine: false,
        highlightActiveLineGutter: false,
      }}
      editable={false}
      {...props}
    />
  );
});

export { RequestEditor, MetadataEditor, ResponseWindow };
